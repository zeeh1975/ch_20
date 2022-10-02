import express from "express";
import path from "path";
import yargs from "yargs/yargs";
import cluster from "cluster";
import * as config from "./config/config.js";
import { router } from "./routes/index.js";
import { passportConfig } from "./middleware/passport.js";
import { sessionConfig } from "./middleware/session.js";
import { app, httpServer, numCPUs } from "./global.js";
import { socketConfig } from "./socket.js";
import { routeLog } from "./middleware/routeLogging.js";
import logger from "./lib/logger.js";
import { getRootDir } from "./lib/util.js";

// configuracion de la sesion usando mongo como persistencia
sessionConfig();

// configuracion passport
passportConfig();

// log de requerimientos
app.use(routeLog);

// contenido estatico
app.use(express.static(path.join(getRootDir(), "./public")));

// ruta raiz
app.use("/", router);

// configuracion del socket
socketConfig();

const args = yargs(process.argv.slice(2))
  .default({
    puerto: config.port, // puerto por defecto
    modo: "FORK",
  })
  .alias({
    p: "puerto",
    m: "modo",
  }).argv;

// creo el servidor de Express en el puerto indicado
if (args.modo.toUpperCase() === "FORK") {
  const server = httpServer.listen(args.puerto, () => {
    logger.info(`Servidor fork escuchando en el puerto ${server.address().port}`);
  });
  // loguear cualquier error a consola
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
} else {
  // mode cluster
  if (cluster.isPrimary) {
    // master
    logger.info(`Servidor primario PID ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      logger.info(`Lanzando worker ${i + 1}`);
      cluster.fork();
    }
    cluster.on("exit", (worker, Code, signal) => {
      logger.info(`Worker ${worker.process.pid} finalizado`);
    });
  } else {
    // fork
    const server = httpServer.listen(args.puerto, () => {
      logger.info(`Worker escuchando en el puerto ${server.address().port} PID ${process.pid}`);
    });
    server.on("error", (error) => logger.info(`Error en servidor ${error}`));
    process.on("exit", (code) => {
      logger.info(`Exit code ${code} PID ${process.pid}`);
    });
  }
}

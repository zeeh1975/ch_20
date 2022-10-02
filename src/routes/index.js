import path from "path";
import { Router } from "express";
import apiRouter from "./api.router.js";
import sessionRouter from "./session.router.js";
import infoRouter from "./info.router.js";
import webRouter from "./web.router.js";
import { webAuth } from "../middleware/session.js";
import { errorRouteLog } from "../middleware/routeLogging.js";
import { getRootDir } from "../lib/util.js";

const router = Router();
const page404 = path.join(getRootDir(), "./private/404.html");

function routeNotFound(req, res) {
  res.status(404).sendFile(page404);
}

router.use("/api", apiRouter);
router.use("/info", infoRouter);
router.use("/", sessionRouter);
router.use("/", webAuth, webRouter);
// rutas inexistentes
router.use("*", errorRouteLog, routeNotFound);

export { router, routeNotFound };

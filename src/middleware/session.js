import connectMongo from "connect-mongo";
import session from "express-session";
import * as config from "../config/config.js";
import { HTTP_STATUS_ERROR_UNAUTHORIZED } from "../const.js";
import { mongoUrl } from "../config/config.js";
import { app } from "../global.js";

function webAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

function apiAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(HTTP_STATUS_ERROR_UNAUTHORIZED)
      .send({ error: "No tiene autorizacion para acceder este recurso" });
  }
}

function sessionConfig() {
  // configuracion de la sesion en mongo atlas
  app.use(
    session({
      store: connectMongo.create({
        mongoUrl: mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true, // para hacer que la sesion se refresque con cada petición
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: config.sessionMaxAge,
      },
    })
  );
}

export { webAuth, apiAuth, sessionConfig };

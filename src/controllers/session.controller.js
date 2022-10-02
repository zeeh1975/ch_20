import fs from "fs";
import path from "path";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} from "../const.js";
import logger from "../lib/logger.js";
import { getRootDir } from "../lib/util.js";

const postLogin = async (req, res) => {
  res.status(HTTP_STATUS_OK).end();
};

const postLoginFailed = async (req, res) => {
  const message = { message: req.session.messages[req.session.messages.length - 1] };
  res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send(message);
};

const getLoginPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.sendFile(path.join(getRootDir(), "./private/login.html"));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

const logoutPage =
  fs.readFileSync(path.join(getRootDir(), "./public/assets/views/logout.hbs")) + "";

const getLogoutPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await req.user;
      const usuario = user.username;
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.baseUrl = "/";
        res.status(HTTP_STATUS_OK).send(logoutPage.replace("{{{body}}}", "Hasta luego " + usuario));
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    logger.error(error.message);
    res.redirect("/");
  }
};

const postSignup = async (req, res) => {
  res.redirect("/");
};

const getSignupPage = async (req, res) => {
  try {
    res.sendFile(path.join(getRootDir(), "./private/signup.html"));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

const postSignupFailed = async (req, res) => {
  const message = { message: req.session.messages[req.session.messages.length - 1] };
  res.status(HTTP_STATUS_ERROR_UNAUTHORIZED).send(message);
};

export default {
  getLogoutPage,
  postLogin,
  postLoginFailed,
  getLoginPage,
  postSignup,
  postSignupFailed,
  getSignupPage,
};

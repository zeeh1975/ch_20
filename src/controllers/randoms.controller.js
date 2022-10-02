import path from "path";
import { fork } from "child_process";
import { HTTP_STATUS_ERROR_BAD_REQUEST } from "../const.js";
import logger from "../lib/logger.js";
import { buildRandomNumberList, getRootDir } from "../lib/util.js";

const getRandomsFork = async (req, res) => {
  try {
    let cantidad = 100000000;
    if (req.query.cant) {
      cantidad = req.query.cant;
    }
    const randoms = fork(path.join(getRootDir(), "./src/randomsFork.js"), [cantidad]);
    randoms.send("start");
    randoms.on("message", (result) => {
      res.end(result);
    });
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

const getRandomsBlocking = async (req, res) => {
  try {
    let cantidad = 100000000;
    if (req.query.cant) {
      cantidad = req.query.cant;
    }
    res.end(JSON.stringify(buildRandomNumberList(cantidad)));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

export default { getRandoms: getRandomsBlocking };

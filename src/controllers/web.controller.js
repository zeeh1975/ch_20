import path from "path";
import { HTTP_STATUS_ERROR_BAD_REQUEST } from "../const.js";
import logger from "../lib/logger.js";
import { getRootDir } from "../lib/util.js";

const getIndexPage = async (req, res) => {
  try {
    res.sendFile(path.join(getRootDir(), "./private/index.html"));
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send(error.message);
  }
};

export default { getIndexPage };

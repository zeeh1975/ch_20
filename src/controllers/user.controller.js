import {
  HTTP_STATUS_OK,
  HTTP_STATUS_ERROR_BAD_REQUEST,
  HTTP_STATUS_ERROR_UNAUTHORIZED,
} from "../const.js";
import logger from "../lib/logger.js";
import { userRepository } from "../repositories/index.js";

const getUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userId = req.session.passport.user;
      const user = await userRepository.getById(userId);
      res.status(HTTP_STATUS_OK).send({ usuario: user.username });
    } else {
      res
        .status(HTTP_STATUS_ERROR_UNAUTHORIZED)
        .send({ error: "No tiene autorizacion para acceder este recurso" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

export default { getUser };

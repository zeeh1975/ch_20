import { productRepository } from "../repositories/index.js";
import { io } from "../global.js";
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK, HTTP_STATUS_ERROR_BAD_REQUEST } from "../const.js";
import logger from "../lib/logger.js";

// Devuelve la lista de productos
const getProductos = async (req, res) => {
  try {
    res.status(HTTP_STATUS_OK).send(await productRepository.getById());
  } catch (error) {
    logger.error(error.message);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

// Agrega un nuevo producto
const addProducto = async (req, res) => {
  try {
    await productRepository.create(req.body);
    res.status(HTTP_STATUS_CREATED).end();
    io.sockets.emit("productos", await productRepository.getById());
  } catch (error) {
    if (error.message) {
      error = error.message;
    }
    logger.error(error);
    res.status(HTTP_STATUS_ERROR_BAD_REQUEST).send({ error });
  }
};

export default { getProductos, addProducto };

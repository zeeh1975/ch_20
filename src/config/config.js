import yargs from "yargs/yargs";
import dotenv from "dotenv";
import path from "path";
import * as constantes from "../const.js";
import { getRootDir } from "../lib/util.js";
dotenv.config();

const productosContenedorArchivo = path.join(getRootDir(), "./db/productos.txt");
const chatContenedorArchivo = path.join(getRootDir(), "./db/chat.txt");
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
const port = process.env.PORT || 8080;
const sessionSecret = process.env.SESSION_SECRET || "secret1234";
const sessionMaxAge = +process.env.SESSION_MAXAGE || 1000 * 60 * 10; // session max age in miliseconds

const args = yargs(process.argv.slice(2))
  .default({
    dao: constantes.DAO_MONGO,
  })
  .alias({
    d: "dao",
  }).argv;

const productDaoType = args.dao.toLowerCase();
const chatDaoType = productDaoType;
const userDaoType = productDaoType;

export {
  mongoUrl,
  port,
  sessionSecret,
  sessionMaxAge,
  productosContenedorArchivo,
  chatContenedorArchivo,
  productDaoType,
  chatDaoType,
  userDaoType,
};

import { DAO_MONGO, DAO_MEMORIA, DAO_ARCHIVO } from "../../const.js";
import UserDaoMongo from "./usuariosDaoMongo.js";
import UserDaoArchivo from "./usuariosDaoArchivo.js";
import UserDaoMemoria from "./usuariosDaoMemoria.js";

export class UsuariosFactoryDao {
  static get(type) {
    switch (type) {
      case DAO_MONGO:
        return UserDaoMongo.getInstance();
      case DAO_ARCHIVO:
        return UserDaoArchivo.getInstance();
      case DAO_MEMORIA:
        return UserDaoMemoria.getInstance();
      default:
        throw new Error("UsuariosFactoryDao tipo invalido " + type);
    }
  }
}

export default UsuariosFactoryDao;

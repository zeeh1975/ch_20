import { DAO_MONGO, DAO_MEMORIA, DAO_ARCHIVO } from "../../const.js";
import ChatDaoMongo from "./chatDaoMongo.js";
import ChatDaoArchivo from "./chatDaoArchivo.js";
import ChatDaoMemoria from "./chatDaoMemoria.js";

export class ChatFactoryDao {
  static get(type) {
    switch (type) {
      case DAO_MONGO:
        return ChatDaoMongo.getInstance();
      case DAO_ARCHIVO:
        return ChatDaoArchivo.getInstance();
      case DAO_MEMORIA:
        return ChatDaoMemoria.getInstance();
      default:
        throw new Error("ProductFactoryDAO tipo invalido " + type);
    }
  }
}

export default ChatFactoryDao;

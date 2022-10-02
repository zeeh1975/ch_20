import FileDao from "../FileDao.js";
import { chatContenedorArchivo } from "../../config/config.js";

let instance;

class ChatDaoArchivo {
  static getInstance() {
    if (!instance) {
      instance = new FileDao(chatContenedorArchivo);
    }
    return instance;
  }
}

export default ChatDaoArchivo;

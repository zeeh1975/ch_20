import FileDao from "../FileDao.js";
import { productosContenedorArchivo } from "../../config/config.js";

let instance;

class usuariosDaoMongo {
  static getInstance() {
    if (!instance) {
      instance = new FileDao(usuariosContenedorArchivo);
    }
    return instance;
  }
}

export default usuariosDaoMongo;

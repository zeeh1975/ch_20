import FileDao from "../FileDao.js";
import { productosContenedorArchivo } from "../../config/config.js";

let instance;

class ProductosDaoMongo {
  static getInstance() {
    if (!instance) {
      instance = new FileDao(productosContenedorArchivo);
    }
    return instance;
  }
}

export default ProductosDaoMongo;

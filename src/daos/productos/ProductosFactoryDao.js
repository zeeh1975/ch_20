import { DAO_MONGO, DAO_MEMORIA, DAO_ARCHIVO } from "../../const.js";
import ProductosDaoMongo from "./productosDaoMongo.js";
import ProductosDaoArchivo from "./productosDaoArchivo.js";
import ProductosDaoMemoria from "./productosDaoMemoria.js";

export class ProductosFactoryDao {
  static get(type) {
    switch (type) {
      case DAO_MONGO:
        return ProductosDaoMongo.getInstance();
      case DAO_ARCHIVO:
        return ProductosDaoArchivo.getInstance();
      case DAO_MEMORIA:
        return ProductosDaoMemoria.getInstance();
      default:
        throw new Error("ProductFactoryDAO tipo invalido " + type);
    }
  }
}

export default ProductosFactoryDao;

import MongoDao from "../MongoDao.js";
import { productosModel } from "../../models/index.js";
import { mongoUrl } from "../../config/config.js";

let instance;

class ProductosDaoMongo {
  static getInstance() {
    if (!instance) {
      instance = new MongoDao(mongoUrl, productosModel);
    }
    return instance;
  }
}

export default ProductosDaoMongo;

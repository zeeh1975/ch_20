import MongoDao from "../MongoDao.js";
import { usuariosModel } from "../../models/index.js";
import { mongoUrl } from "../../config/config.js";

let instance;

class UsuariosDaoMongo {
  static getInstance() {
    if (!instance) {
      instance = new MongoDao(mongoUrl, usuariosModel);
    }
    return instance;
  }
}

export default UsuariosDaoMongo;

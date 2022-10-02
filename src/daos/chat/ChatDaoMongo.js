import MongoDao from "../MongoDao.js";
import { chatModel } from "../../models/index.js";
import { mongoUrl } from "../../config/config.js";

let instance;

class ChatDaoMongo {
  static getInstance() {
    if (!instance) {
      instance = new MongoDao(mongoUrl, chatModel);
    }
    return instance;
  }
}

export default ChatDaoMongo;

import MemoryDao from "../MemoryDao.js";

let instance;

class ChatDaoMemoria {
  static getInstance() {
    if (!instance) {
      instance = new MemoryDao();
    }
    return instance;
  }
}

export default ChatDaoMemoria;

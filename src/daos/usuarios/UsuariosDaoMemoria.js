import MemoryDao from "../MemoryDao.js";

let instance;

class UsuariosDaoMemoria {
  static getInstance() {
    if (!instance) {
      instance = new MemoryDao();
    }
    return instance;
  }
}

export default UsuariosDaoMemoria;

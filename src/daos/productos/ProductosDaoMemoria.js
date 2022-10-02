import MemoryDao from "../MemoryDao.js";

let instance;

class ProductosDaoMemoria {
  static getInstance() {
    if (!instance) {
      instance = new MemoryDao();
    }
    return instance;
  }
}

export default ProductosDaoMemoria;

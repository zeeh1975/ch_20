import fs from "fs";
import Dao from "./Dao.js";
const encoding = "utf8";

class FileDao extends Dao {
  constructor(nombreArchivoContenedor) {
    super();
    this.nombreArchivo = nombreArchivoContenedor;
    this.listaItems = this.readFromFile();
  }

  async saveToFile() {
    try {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.listaItems), encoding);
    } catch (error) {
      throw error;
    }
  }

  readFromFile() {
    try {
      return JSON.parse(fs.readFileSync(this.nombreArchivo));
    } catch (error) {
      // Hubo un error al leer el archivo,
      // asumo que no existe y retorno un arreglo vacío
      return [];
    }
  }

  async save(newItem) {
    let id = 0;
    this.listaItems.forEach((element) => {
      if (element.id > id) id = element.id;
    });
    id++;
    newItem.id = id;
    this.listaItems.push(newItem);
    await this.saveToFile();
    return id;
  }

  indexOf(idBuscado) {
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].id === idBuscado) return i;
    }
    return -1;
  }

  getById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      return this.listaItems[index];
    }
    return null;
  }

  getAll() {
    return this.listaItems;
  }

  async deleteById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      let itemEliminado = this.listaItems[index];
      this.listaItems.splice(index, 1);
      // escribo el archivo (async)
      await this.saveToFile();
      return itemEliminado;
    } else {
      return null;
    }
  }
  async deleteAll() {
    this.listaItems = [];
    await this.saveToFile();
  }

  async find(obj) {
    return findObj(obj, this.listaItems);
  }

  async updateById(idBuscado, itemActualizado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // actualizo el producto
      itemActualizado.id = idBuscado;
      this.listaItems[index] = itemActualizado;
      await this.saveToFile();
      return itemActualizado;
    } else {
      return null;
    }
  }
}

export default FileDao;

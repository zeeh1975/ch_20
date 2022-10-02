import { cloneObj, findObj } from "../lib/util.js";
import Dao from "./Dao.js";

class MemoryDao extends Dao {
  constructor() {
    super();
    this.listaItems = [];
  }
  // agrega un nuevo item al contenedor
  async save(newItem) {
    // busco el id máximo actual y le sumo 1
    let id = 0;
    this.listaItems.forEach((element) => {
      if (element.id > id) id = element.id;
    });
    id++;
    // asigno el id en el objeto
    newItem.id = id;
    newItem.timestamp = +new Date();
    // agrego el objeto a la lista de items
    this.listaItems.push(cloneObj(newItem));
    // escribo el archivo (async)
    return id;
  }

  // devuelve el índice en listaItems de idBuscado si existe
  indexOf(idBuscado) {
    for (let i = 0; i < this.listaItems.length; i++) {
      if (this.listaItems[i].id == idBuscado) return i;
    }
    return -1;
  }

  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      return cloneObj(this.listaItems[index]);
    }
    return null;
  }

  async find(obj) {
    return findObj(obj, this.listaItems);
  }

  // devuelve la lista completa de items
  async getAll() {
    return cloneObj(this.listaItems);
  }

  // elimina el item del id indicado
  async deleteById(idBuscado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // borro el elemento del arreglo
      let itemEliminado = this.listaItems[index];
      this.listaItems.splice(index, 1);
      return itemEliminado;
    } else {
      return null;
    }
  }

  async deleteAll() {
    this.listaItems = [];
    // escribo el archivo (async)
  }
  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    let index = this.indexOf(idBuscado);
    if (index >= 0) {
      // actualizo el producto
      itemActualizado.id = this.listaItems[index].id;
      itemActualizado.timestamp = this.listaItems[index].timestamp;
      this.listaItems[index] = cloneObj(itemActualizado);
      return itemActualizado;
    } else {
      return null;
    }
  }
  async disconnect() {}
}

export default MemoryDao;

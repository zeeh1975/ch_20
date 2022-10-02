import ProductosFactoryDao from "../daos/productos/ProductosFactoryDao.js";
import { productDaoType } from "../config/config.js";

const productosMuestra = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

async function insertTestData() {
  const productos = ProductosFactoryDao.get(productDaoType);
  await productos.deleteAll();
  for (let i = 0; i < productosMuestra.length; i++) {
    console.log(await productos.save(productosMuestra[i]));
  }
  console.log(await productos.getAll());
  await productos.disconnect();
}

insertTestData();

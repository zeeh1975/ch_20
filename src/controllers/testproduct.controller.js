import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import logger from "../lib/logger.js";
import { getRootDir } from "../lib/util.js";

const indexHbs = fs.readFileSync(path.join(getRootDir(), "./public/assets/views/index.hbs")) + "";
const tabla_productos =
  fs.readFileSync(path.join(getRootDir(), "./public/assets/views/tabla_productos.hbs")) + "";

async function getProductosTest(req, res) {
  try {
    const cantidad = req.query.cant || 5;
    const testProducts = [];
    for (let i = 0; i < cantidad; i++) {
      testProducts.push({
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
      });
    }

    const view = indexHbs.replace("{{{body}}}", tabla_productos);
    const template = Handlebars.compile(view);
    const html = template({ productos: testProducts });

    res.end(html);
  } catch (error) {
    logger.error(error.message);
  }
}

export default { getProductosTest };

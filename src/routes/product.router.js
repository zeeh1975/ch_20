import { Router } from "express";
import { productController } from "../controllers/index.js";
const router = Router();

router.get("/", productController.getProductos);
router.post("/", productController.addProducto);

export default router;

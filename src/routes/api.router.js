import { Router } from "express";
import productRouter from "./product.router.js";
import testProductRouter from "./testproduct.router.js";
import randomsRouter from "./randoms.router.js";
import { apiAuth } from "../middleware/session.js";

const router = Router();
router.use("/productos", apiAuth, productRouter);
router.use("productos-test", testProductRouter);
router.use("randoms", randomsRouter);

export default router;

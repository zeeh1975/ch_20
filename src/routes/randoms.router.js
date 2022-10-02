import { Router } from "express";
import { randomsController } from "../controllers/index.js";
const router = Router();

router.get("/", randomsController.getRandoms);

export default router;

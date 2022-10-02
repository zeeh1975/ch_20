import { Router } from "express";
import { webController } from "../controllers/index.js";

const router = Router();
router.get("/", webController.getIndexPage);

export default router;

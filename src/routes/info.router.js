import { Router } from "express";
import { infoPageController } from "../controllers/index.js";

const router = Router();

router.get("/", infoPageController.getInfoPage);
router.get("/log", infoPageController.getInfoLogPage);

export default router;

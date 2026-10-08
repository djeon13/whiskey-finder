import { Router } from "express";

import { getBartenderPerspective } from "../controllers/bartender.js";

const router = Router();

router.post("/", getBartenderPerspective);

export default router;

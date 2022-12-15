import { Router } from "express";

import {
  getProductInventory,
} from "../controllers/inventory.controller";

const router = Router();

router.get("/inventory", getProductInventory);

export default router;

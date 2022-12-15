import { Router } from "express";

import {
  getOrders,
  createNewOrder,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  getTotalOrders,
  updateBestSellers,
} from "../controllers/orders.controller";

const router = Router();

router.get("/orders", getOrders);

router.post("/orders", createNewOrder);

router.post("/orders/best", updateBestSellers);

router.get("/orders/count", getTotalOrders);

router.get("/orders/:id", getOrderById);

router.delete("/orders/:id", deleteOrderById);

router.put("/orders/:id", updateOrderById);

export default router;

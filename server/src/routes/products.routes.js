import { Router } from "express";

import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  getTotalProducts,
  updateProductById,
  getMaxOfEachType,
  getTop,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);

router.post("/products", createNewProduct);

router.get("/products/count", getTotalProducts);

router.get("/products/max", getMaxOfEachType);

router.get("/products/:id", getProductById);

router.get("/products/top/:number", getTop);

router.delete("/products/:id", deleteProductById);

router.put("/products/:id", updateProductById);

export default router;

import { Router } from "express";

import {
  getCustomers,
  createNewCustomer,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  getTotalCustomers,
} from "../controllers/customers.controller";

const router = Router();

router.get("/customers", getCustomers);

router.post("/customers", createNewCustomer);

router.get("/customers/count", getTotalCustomers);

router.get("/customers/:id", getCustomerById);

router.delete("/customers/:id", deleteCustomerById);

router.put("/customers/:id", updateCustomerById);

export default router;

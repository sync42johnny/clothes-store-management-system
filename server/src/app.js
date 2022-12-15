import express from "express";
import cors from "cors";
import config from "./config";

import productsRoutes from "./routes/products.routes";
import customersRoutes from "./routes/customers.routes";
import ordersRoutes from "./routes/orders.routes";
import productInventoryRoutes from "./routes/inventory.routes";

const app = express();

//settings
app.set("port", config.port);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);
app.use(customersRoutes);
app.use(ordersRoutes);
app.use(productInventoryRoutes);

export default app;

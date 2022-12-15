import { getConnection, sql, queries } from "../database";

export const getOrders = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.orders.getAllOrders);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewOrder = async (req, res) => {
  const { ProductID, CustomerID, Qnt } = req.body;

  if ((ProductID == null || CustomerID == null, Qnt == null)) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("ProductID", sql.Int, ProductID)
      .input("CustomerID", sql.Int, CustomerID)
      .input("Qnt", sql.Int, Qnt)
      .query(queries.orders.addNewOrder);

    res.json({ ProductID, CustomerID, Qnt });
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.orders.getOrderById);

  res.send(result.recordset[0]);
};

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.orders.deleteOrder);

  res.sendStatus(204);
};

export const updateOrderById = async (req, res) => {
  const { OrderStatus } = req.body;
  const { id } = req.params;

  if (OrderStatus == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }
  const pool = await getConnection();
  await pool
    .request()
    .input("OrderStatus", sql.VarChar, OrderStatus)
    .input("id", sql.Int, id)
    .query(queries.orders.updateOrderById);

  res.json({ OrderStatus });
};

export const getTotalOrders = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.orders.getTotalOrders);

  res.json(result.recordset[0][""]);
};

export const updateBestSellers = async (req, res) => {
  const pool = await getConnection();
  await pool.request().execute("AddToBestSellers");

  res.sendStatus(204);
};

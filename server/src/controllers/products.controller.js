import { getConnection, sql, queries } from "../database";

/* export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.products.getAllProducts);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
}; */

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("GetProducts");

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
};


export const createNewProduct = async (req, res) => {
  const { ProductName, TypeName, ProductPrice } = req.body;

  if (ProductName == null || TypeName == null, ProductPrice == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ProductName", sql.VarChar, ProductName)
      .input("TypeName", sql.VarChar, TypeName)
      .input("ProductPrice", sql.Decimal(18, 2), ProductPrice)
      .execute("AddProduct");

    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.products.getProductById);

  res.send(result.recordset[0]);
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.products.deleteProduct);

  res.sendStatus(204);
};

export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.products.getTotalProducts);

  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { ProductName, TypeID, ProductPrice } = req.body;
  const { id } = req.params;

  if ((ProductName == null || TypeID == null, ProductPrice === null)) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("ProductName", sql.VarChar, ProductName)
    .input("TypeID", sql.Int, TypeID)
    .input("ProductPrice", sql.Decimal(18, 2), ProductPrice)
    .input("id", sql.Int, id)
    .query(queries.products.updateProductById);

  res.json({ ProductName, TypeID, ProductPrice });
};

export const getMaxOfEachType = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.products.getMaxOfEachType);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
};

export const getTop = async (req, res) => {
  try {
    const { number } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
    .input("Number", number)
    .query(queries.products.getTop);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error, message);
  }
};
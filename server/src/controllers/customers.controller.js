import { getConnection, sql, queries } from "../database";

export const getCustomers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.customers.getAllCustomers);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewCustomer = async (req, res) => {
  const { CustomerName, CustomerSurname } = req.body;

  if (CustomerName == null || CustomerSurname == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }

  try {
    const pool = await getConnection();

    const response = await pool
      .request()
      .input("CustomerName", sql.VarChar, CustomerName)
      .input("CustomerSurname", sql.VarChar, CustomerSurname)
      .query(queries.customers.addNewCustomer);

    res.send(response);
    //res.json({ CustomerName, CustomerSurname });
  } catch (error) {
    res.status(500);
    res.send(error.originalError.info.message);
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.customers.getCustomerById);

  res.send(result.recordset[0]);
};

export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id)
    .query(queries.customers.deleteCustomer);

  res.sendStatus(204);
};

export const updateCustomerById = async (req, res) => {
  const { CustomerName, CustomerSurname } = req.body;
  const { id } = req.params;

  if (CustomerName == null || CustomerSurname == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill All Fields" });
  }
  const pool = await getConnection();
  await pool
    .request()
    .input("CustomerName", sql.VarChar, CustomerName)
    .input("CustomerSurname", sql.VarChar, CustomerSurname)
    .input("id", sql.Int, id)
    .query(queries.customers.updateCustomerById);

  res.json({ CustomerName, CustomerSurname });
};

export const getTotalCustomers = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.customers.getTotalCustomers);

  res.json(result.recordset[0][""]);
};

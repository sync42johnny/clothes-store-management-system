import { getConnection, sql, queries } from "../database";

export const getProductInventory = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.inventory.getProductInventory);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

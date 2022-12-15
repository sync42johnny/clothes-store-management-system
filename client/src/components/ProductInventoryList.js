import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [inventory, setInventory] = useState([])

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    const response = await axios.get("http://localhost:5000/inventory");
    setInventory(response.data);
  };

  return (
    <div className="table-container is-centered pt-5 px-5">
      <div className="is-flex is-justify-content-space-between mb-4">
      </div>
      <table className="table  is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => {
            return (
              <tr key={item.ProductInventoryID}>
                <td>{item.ProductID}</td>
                <td>{item.Qnt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

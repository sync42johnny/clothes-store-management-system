import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getOrders();
    getTotal();
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:5000/orders");
    setOrders(response.data);
  };

  const getTotal = async () => {
    const response = await axios.get("http://localhost:5000/orders/count");
    setTotal(response.data);
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container is-centered pt-5 px-5">
      <div className="is-flex is-justify-content-space-between mb-4">
        <Link to={`add`} className="button is-success">
          Add new
        </Link>
        <div>Total: {total}</div>
      </div>
      <table className="table  is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Customer ID</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{order.ProductID}</td>
                <td>{order.CustomerID}</td>
                <td>{order.Qnt}</td>
                <td>{order.Total}</td>
                <td>{order.OrderStatus}</td>
                <td className="is-flex is-justify-content-flex-end is-flex-wrap-wrap">
                  <Link
                    to={`edit/${order.OrderID}`}
                    className="button is-small is-info"
                    style={{ minWidth: "62px" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteOrder(order.OrderID)}
                    className="button is-small is-danger ml-1"
                    style={{ minWidth: "62px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

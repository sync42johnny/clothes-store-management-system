import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [ProductID, setProductID] = useState(0);
  const [CustomerID, setCustomerID] = useState(0);
  const [Qnt, setQnt] = useState(0);
  const [Total, setTotal] = useState(0);
  const [OrderStatus, setOrderStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getOrderById();
  }, []);

  const updateOrder = async (e) => {
    e.preventDefault();
    setOrderStatus("completed")
    try {
      await axios.put(`http://localhost:5000/orders/${id}`, {
        OrderStatus,
      });
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderById = async () => {
    const response = await axios.get(`http://localhost:5000/orders/${id}`);
    setProductID(response.data.ProductID);
    setCustomerID(response.data.CustomerID);
    setQnt(response.data.Qnt);
    setTotal(response.data.Total);
    setOrderStatus(response.data.OrderStatus);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateOrder}>
          <div className="field">
            <label className="label">Product ID</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={ProductID}
                onChange={(e) => setProductID(e.target.value)}
                placeholder="Product ID"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Customer ID</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={CustomerID}
                onChange={(e) => setCustomerID(e.target.value)}
                placeholder="Customer ID"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Qnt}
                onChange={(e) => setQnt(e.target.value)}
                placeholder="Quantity"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Total</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Total"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Order Status</label>
            <div className="control">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={OrderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value={"new"}>new</option>
                    <option value={"completed"}>completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

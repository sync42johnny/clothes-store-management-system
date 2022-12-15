import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [ProductID, setProductID] = useState(0);
  const [CustomerID, setCustomerID] = useState(0);
  const [Qnt, setQnt] = useState(0);
  const [Total, setTotal] = useState(0);
  const [OrderStatus, setOrderStatus] = useState("new");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/orders", {
        ProductID,
        CustomerID,
        Qnt,
      });
      updateBestSellers();
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const getCustomers = async () => {
    const response = await axios.get("http://localhost:5000/customers");
    setCustomers(response.data);
  };

  const updateBestSellers = async () => {
    await axios.post("http://localhost:5000/orders/best")
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveOrder}>
          <div className="field">
            <label className="label">Product name</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={ProductID}
                  onChange={(e) => setProductID(e.target.value)}
                >
                  <option>Select Product Name</option>
                  {products.map((product, index) => {
                    return (
                      <option value={product.ProductID} key={index}>
                        {product.ProductName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Customer name</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={CustomerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                >
                  <option>Select Customer Name</option>
                  {customers.map((customer, index) => {
                    return (
                      <option value={customer.CustomerID} key={index}>
                        {customer.CustomerName} {customer.CustomerSurname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={Qnt}
                onChange={(e) => setQnt(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Total</label>
            <div className="control">
              <input
                type="number"
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
              <input
                type="text"
                className="input"
                value={OrderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                placeholder="Order Status"
                disabled
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

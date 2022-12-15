import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [ProductName, setName] = useState("");
  const [TypeID, setType] = useState(1);
  const [ProductPrice, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        ProductName,
        TypeID,
        ProductPrice,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setName(response.data.ProductName);
    setType(response.data.TypeID);
    setPrice(response.data.ProductPrice);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={ProductName}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Product type</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={TypeID}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={1}>t-shirt</option>
                  <option value={2}>jackets</option>
                  <option value={3}>jeans</option>
                  <option value={4}>hoodies</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Product price</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={ProductPrice}
                onChange={(e) => setPrice(e.target.value)}
                step=".01"
                min="0.00"
                placeholder="price"
              />
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerSurname, setCustomerSurname] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCustomerById();
  }, []);

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/customers/${id}`, {
        CustomerName,
        CustomerSurname,
      });
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerById = async () => {
    const response = await axios.get(`http://localhost:5000/customers/${id}`);
    setCustomerName(response.data.CustomerName);
    setCustomerSurname(response.data.CustomerSurname);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateCustomer}>
          <div className="field">
            <label className="label">Customer name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Customer surname</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={CustomerSurname}
                onChange={(e) => setCustomerSurname(e.target.value)}
                placeholder="Customer surname"
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

export default EditCustomer;

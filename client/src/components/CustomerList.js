import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState()

  useEffect(() => {
    getCustomers();
    getTotal();
  }, []);

  const getCustomers = async () => {
    const response = await axios.get("http://localhost:5000/customers");
    setCustomers(response.data);
  };

  const getTotal = async () => {
    const response = await axios.get("http://localhost:5000/customers/count");
    setTotal(response.data);
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      getCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container is-centered pt-5 px-5">
      <div className="is-flex is-justify-content-space-between mb-4">
        <Link to={`/customers/add`} className="button is-success">
          Add new
        </Link>
        <div>Total: {total}</div>
      </div>
      <table className="table  is-striped is-fullwidth">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={customer.CustomerID}>
                <td>{customer.CustomerID}</td>
                <td>{customer.CustomerName}</td>
                <td>{customer.CustomerSurname}</td>
                <td className="is-flex is-justify-content-flex-end is-flex-wrap-wrap">
                  <Link
                    to={`edit/${customer.CustomerID}`}
                    className="button is-small is-info"
                    style={{ minWidth: "62px" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCustomer(customer.CustomerID)}
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

export default CustomerList;

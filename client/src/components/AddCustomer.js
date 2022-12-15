import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const AddCustomer = () => {
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerSurname, setCustomerSurname] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/customers", {
        CustomerName,
        CustomerSurname,
      });
      navigate("/customers");
    } catch (error) {
      setMessage(error.response.data);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="columns mt-5 is-centered p-5">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Messages from Database"
        ariaHideApp={false}
      >
        <div>{message}</div>
        <button className="button is-warning" onClick={closeModal}>
          close
        </button>
      </Modal>
      <div className="column is-half">
        <form onSubmit={saveCustomer}>
          <div className="field">
            <label className="label">Customer name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer name"
                required
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
                required
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
  },
};

export default AddCustomer;

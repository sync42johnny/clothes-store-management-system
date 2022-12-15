import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const AddProduct = () => {
  const [ProductName, setName] = useState("");
  const [TypeName, setType] = useState("");
  const [ProductPrice, setPrice] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/products", {
        ProductName,
        TypeName,
        ProductPrice,
      });
      switch (response.data.returnValue) {
        case 100:
          setMessage('"no such type" exists');
          setIsOpen(true);
          break;
        case -1:
          setMessage("product data exists");
          setIsOpen(true);
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="columns mt-5 is-centered">
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
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={ProductName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Type name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={TypeName}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type name"
                required
              />
            </div>
          </div>
          {/* <div className="field">
            <label className="label">Product type</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={TypeID}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="1">t-shirt</option>
                  <option value="2">jackets</option>
                  <option value="3">jeans</option>
                  <option value="4">hoodies</option>
                </select>
              </div>
            </div>
          </div> */}
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
                placeholder="Product price"
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

export default AddProduct;

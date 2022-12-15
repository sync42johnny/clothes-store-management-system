import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/* import Modal from 'react-modal'; */

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts();
    getTotal();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const getTotal = async () => {
    const response = await axios.get("http://localhost:5000/products/count");
    setTotal(response.data);
  };

  const getMax = async () => {
    const response = await axios.get("http://localhost:5000/products/max");
    setProducts(response.data);
  };

  const getTop = async (number) => {
    const response = await axios.get(`http://localhost:5000/products/top/${number}`);
    setProducts(response.data);
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  } */

  return (
    <div className="table-container is-centered pt-5 px-5">
      <div className="is-flex is-justify-content-space-between mb-4">
        <Link to={`add`} className="button is-success">
          Add new
        </Link>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="rsvp"
              defaultChecked
              onChange={getProducts}
            />
            default
          </label>
          <label className="radio">
            <input type="radio" name="rsvp" onChange={getMax} />
            max of each type
          </label>
        </div>
        <div className="select is-info">
          <select onChange={(e) => getTop(e.target.value)}>
          {Array.from({ length: total }, (_, i) => <option key={i}>{i + 1}</option>)}
          </select>
        </div>
        <div>Total: {total}</div>
      </div>
      {/* <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
      </Modal> */}
      <table className="table  is-striped is-fullwidth">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product.ProductID}>
                <td>{product.ProductID}</td>
                <td>{product.ProductName}</td>
                <td>{product.TypeName}</td>
                <td>{product.ProductPrice.toFixed(2)}</td>
                <td className="is-flex is-justify-content-flex-end is-flex-wrap-wrap">
                  <Link
                    to={`edit/${product.ProductID}`}
                    className="button is-small is-info"
                    style={{ minWidth: "62px" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.ProductID)}
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

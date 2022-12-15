import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isActive, setisActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Products</Link>
          <Link to="/customers" className="navbar-item">Customers</Link>
          <Link to="/orders" className="navbar-item">Orders</Link>
          <Link to="/inventory" className="navbar-item">Product Inventory</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

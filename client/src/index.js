import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container">
      <App />
    </div>
  </React.StrictMode>
);

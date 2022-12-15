import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import OrderList from "./components/OrderList";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";
import ProductInventoryList from "./components/ProductInventoryList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/add" element={<AddOrder />} />
        <Route path="/orders/edit/:id" element={<EditOrder />} />
        <Route path="/inventory" element={<ProductInventoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

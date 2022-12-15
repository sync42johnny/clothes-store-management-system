export const queries = {
  products: {
    getAllProducts: "SELECT * FROM Products",
    addNewProduct:
      "INSERT INTO Products (ProductName, TypeID, ProductPrice) VALUES (@ProductName, @TypeID, @ProductPrice)",
    getProductById: "SELECT * FROM Products WHERE ProductID = @id",
    deleteProduct: "DELETE FROM Products WHERE ProductID = @id",
    getTotalProducts: "SELECT COUNT(*) FROM Products",
    updateProductById:
      "UPDATE Products SET ProductName = @ProductName, TypeID = @TypeID, ProductPrice = @ProductPrice WHERE ProductID = @id",
    getMaxOfEachType: "SELECT * FROM dbo.FUNC_GetMaxOfEachType()",
    getTop: "SELECT * FROM dbo.FUNC_GetTop(@Number)",
  },
  customers: {
    getAllCustomers: "SELECT * FROM Customers",
    addNewCustomer:
      "INSERT INTO Customers (CustomerName, CustomerSurname) VALUES (@CustomerName, @CustomerSurname)",
    getCustomerById: "SELECT * FROM Customers WHERE CustomerID = @id",
    deleteCustomer: "DELETE FROM Customers WHERE CustomerID = @id",
    getTotalCustomers: "SELECT COUNT(*) FROM Customers",
    updateCustomerById:
      "UPDATE Customers SET CustomerName = @CustomerName, CustomerSurname = @CustomerSurname WHERE CustomerID = @id",
  },
  orders: {
    getAllOrders: "SELECT * FROM Orders",
    addNewOrder:
      "INSERT INTO Orders (ProductID, CustomerID, Qnt) VALUES (@ProductID, @CustomerID, @Qnt)",
    getOrderById: "SELECT * FROM Orders WHERE OrderID = @id",
    deleteOrder: "DELETE FROM Orders WHERE OrderID = @id",
    updateOrderById:
      "UPDATE Orders SET OrderStatus = @OrderStatus WHERE OrderID = @id",
    getTotalOrders: "SELECT COUNT(*) FROM Orders",
    addToBestSellers: ""
  },
  inventory: {
    getProductInventory: "SELECT * FROM ProductInventory",
  },
};

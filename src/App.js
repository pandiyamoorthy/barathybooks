import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';
import Home from './components/users/Home/Home';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard';
import UploadProducts from './components/admin/Dashboard/UploadProducts';
import OrderDetails from './components/admin/Dashboard/OrderDetails';
import ManageUsers from './components/admin/Dashboard/ManageUsers';
import Settings from './components/admin/Dashboard/Settings';
import Products from './components/users/Products/Products';
import ViewProduct from './components/admin/Dashboard/ViewProduct'; // Import ViewProduct
import EditProducts from './components/admin/Dashboard/EditProducts'; // Import EditProducts

function App() {
  console.log("App component rendered");

  const isAuthenticated = () => {
    // Replace this with actual authentication logic
    return !!localStorage.getItem('authToken');
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/upload-products" element={<ProtectedRoute element={<UploadProducts />} />} />
        <Route path="/order-details" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/manage-users" element={<ProtectedRoute element={<ManageUsers />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        <Route path="/view-products" element={<ProtectedRoute element={<ViewProduct />} />} /> {/* Add ViewProduct route */}
        <Route path="/edit-product/:id" element={<ProtectedRoute element={<EditProducts />} />} /> {/* Add EditProducts route */}
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;


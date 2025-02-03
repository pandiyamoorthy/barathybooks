import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/upload-products">Upload Products</Link></li>
          <li><Link to="/view-products">View Products</Link></li> {/* Added View Products link */}
          <li><Link to="/order-details">Order Details</Link></li>
          <li><Link to="/manage-users">Manage Users</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <h1>Admin Dashboard</h1>
      {/* Add your admin dashboard content here */}
    </div>
  );
}

export default AdminDashboard;

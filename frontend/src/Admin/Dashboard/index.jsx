import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Navbar";
import "./dashboard.css";
import { notification } from 'antd';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      notification.warn({
        message: 'Please login',
        description: 'You need to login to access the dashboard.',
      });
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h3>Welcome to Admin Panel</h3>
        <div className="dashboard-content">
          <p>Select an option from the navigation menu to get started.</p>
          {/* Add links or buttons to navigate to different sections */}
          <div className="dashboard-links">
            <button onClick={() => navigate('/admin/employees')}>Manage Employees</button>
            <button onClick={() => navigate('/admin/reports')}>View Reports</button>
            <button onClick={() => navigate('/admin/settings')}>Settings</button>
          </div>
        </div>
      </div>
      {/* <footer className="footer">
          <p>&copy; 2024 Dealdray. All rights reserved.</p>
        </footer> */}
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    navigate('/');
  };

  const AdminMenu = (
    <Menu className="dropdown-menu">
      <Menu.Item className="dropdown-menu-item" onClick={handleLogin}>
        <a>Login</a>
      </Menu.Item>
      <Menu.Item className="dropdown-menu-item" onClick={handleLogout}>
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="nav-home">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/admin/employees">Employee List</a></li>
        </ul>
      </div>
      <div className="nav-admin">
        <Dropdown overlay={AdminMenu} placement="bottomRight">
          <span>
            <Button className="ant-dropdown-link" type="link">Admin</Button>
            <i className="fa-solid fa-user"></i>
          </span>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;

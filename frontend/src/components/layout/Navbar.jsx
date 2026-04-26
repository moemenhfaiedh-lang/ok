import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';

import { useTheme } from '../../context/ThemeContext'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const { isDarkMode, toggleTheme } = useTheme();

  const hideNavbar = location.pathname === '/' || location.pathname === '/register';
  if (hideNavbar) return null;

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 py-2" 
          style={{ background: 'var(--bs-body-bg)', borderBottom: '1px solid var(--bs-border-color)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          IronPulse <span style={{ color: '#00cec9' }}>🏋️</span>
        </Link>

        <div className="ms-auto d-flex align-items-center gap-3">
          {/* ADD THE DARK MODE TOGGLE BUTTON */}
          <button 
            onClick={toggleTheme} 
            className={`btn btn-sm border-0 rounded-circle p-2`}
            style={{ fontSize: '1.2rem', color: isDarkMode ? '#f1c40f' : '#2c3e50' }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
          </button>

          <Link to="/dashboard" className="nav-link px-2 d-none d-md-block">Dashboard</Link>
          <Link to="/profile" className="nav-link px-2 d-none d-md-block">Profile</Link>
          
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
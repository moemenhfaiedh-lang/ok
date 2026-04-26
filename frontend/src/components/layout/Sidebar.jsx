import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Workouts', path: '/workouts', icon: '🏋️‍♂️' },

    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={menuContainer}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...navLinkStyle,
              backgroundColor: isActive ? '#e0fcfb' : 'transparent',
              color: isActive ? '#00cec9' : '#636e72',
              fontWeight: isActive ? '600' : '400',
              borderRight: isActive ? '4px solid #00cec9' : 'none',
            })}
          >
            <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      <div style={footerStyle}>
        <small>© 2026 IronPulse v1.0</small>
      </div>
    </aside>
  );
};


const sidebarStyle = {
  width: '260px',
  background: '#ffffff',
  height: 'calc(100vh - 70px)', 
  position: 'sticky',
  top: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: '1px solid #dfe6e9',
  paddingTop: '20px',
  transition: 'all 0.3s ease',
};

const menuContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 25px',
  textDecoration: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
};

const footerStyle = {
  padding: '20px 25px',
  borderTop: '1px solid #f1f2f6',
  color: '#b2bec3',
  textAlign: 'center',
};

export default Sidebar;
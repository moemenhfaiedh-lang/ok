import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';

const Settings = () => {
  
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <h2 className="fw-bold mb-4">Account Settings</h2>

      {/* --- Appearance Section --- */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-transparent py-3 border-bottom-0">
          <h6 className="mb-0 fw-bold text-uppercase small text-muted">Appearance</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 className="mb-0 fw-bold">Dark Mode</h6>
              <small className="text-muted">Adjust the app's appearance to reduce eye strain</small>
            </div>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="darkModeSwitch"
                checked={isDarkMode}
                onChange={toggleTheme}
                style={{ width: '2.5em', height: '1.25em', cursor: 'pointer' }}
              />
            </div>
          </li>
        </ul>
      </div>

      {/* --- Notifications Section --- */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-transparent py-3 border-bottom-0">
          <h6 className="mb-0 fw-bold text-uppercase small text-muted">Notifications</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 className="mb-0 fw-bold">Email Reminders</h6>
              <small className="text-muted">Receive a weekly summary of your workouts</small>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
            </div>
          </li>
        </ul>
      </div>

      {/* --- Danger Zone --- */}
      <div className="card border-0 shadow-sm rounded-4 border-start border-danger border-5">
        <div className="card-body d-flex justify-content-between align-items-center p-4">
          <div>
            <h6 className="mb-1 fw-bold text-danger">Delete Account</h6>
            <p className="text-muted small mb-0">Once deleted, your workout history cannot be recovered.</p>
          </div>
          <Button variant="danger" onClick={() => alert("Please contact support to delete account.")}>
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
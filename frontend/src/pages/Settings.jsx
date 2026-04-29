import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import userService from '../services/user.service'; // Import the user service

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // --- Password State ---
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  // --- Password Handler ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setStatus({ type: 'danger', msg: 'New passwords do not match' });
    }

    try {
      await userService.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setStatus({ type: 'success', msg: 'Password updated successfully!' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus({ type: 'danger', msg: err.response?.data?.msg || 'Error updating password' });
    }
  };

  // --- Delete Account Handler ---
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you absolutely sure? This will permanently delete your account and all workout data. This cannot be undone."
    );

    if (confirmDelete) {
      try {
        await userService.deleteAccount(); // Use the service instead of direct axios
        localStorage.removeItem('token');
        alert("Account successfully deleted.");
        navigate('/');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.msg || "Error deleting account.");
      }
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      {/* text-dark ensures visibility in Dark Mode on white cards */}
      <h2 className="fw-bold mb-4 text-dark">Account Settings</h2>

      {/* --- Change Password Section --- */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 p-4">
        <h6 className="mb-4 fw-bold text-uppercase small text-muted">Security</h6>
        <h5 className="fw-bold text-dark mb-3">Change Password</h5>
        
        {status.msg && (
          <div className={`alert alert-${status.type} py-2 small`}>{status.msg}</div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="text-dark small fw-bold mb-1">Current Password</label>
              <input 
                type="password" 
                className="form-control bg-light border-0" 
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="text-dark small fw-bold mb-1">New Password</label>
              <input 
                type="password" 
                className="form-control bg-light border-0" 
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="text-dark small fw-bold mb-1">Confirm New Password</label>
              <input 
                type="password" 
                className="form-control bg-light border-0" 
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                required
              />
            </div>
            <div className="col-12 mt-3 text-end">
              <Button type="submit">Update Password</Button>
            </div>
          </div>
        </form>
      </div>

      {/* --- Appearance Section --- */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-transparent py-3 border-bottom-0">
          <h6 className="mb-0 fw-bold text-uppercase small text-muted">Appearance</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 className="mb-0 fw-bold text-dark">Dark Mode</h6>
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

      {/* --- Danger Zone --- */}
      <div className="card border-0 shadow-sm rounded-4 border-start border-danger border-5">
        <div className="card-body d-flex justify-content-between align-items-center p-4">
          <div>
            <h6 className="mb-1 fw-bold text-danger">Delete Account</h6>
            <p className="text-muted small mb-0">Once deleted, your workout history cannot be recovered.</p>
          </div>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
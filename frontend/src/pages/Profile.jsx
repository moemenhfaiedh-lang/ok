import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:5000/api/user/me', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  if (!user) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="d-flex">
      <main className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container py-4">
          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-body p-5 text-center">
              <div className="position-relative d-inline-block mb-4">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                  {user.name.charAt(0)}
                </div>
                <span className="position-absolute bottom-0 end-0 badge rounded-pill bg-success border border-2 border-white p-2">
                  <span className="visually-hidden">Online</span>
                </span>
              </div>
              <h2 className="fw-bold">{user.name}</h2>
              <p className="text-muted mb-4">{user.email}</p>
              <div className="d-flex justify-content-center gap-2">
                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">IronPulse PRO</span>
                <span className="badge bg-warning-subtle text-warning rounded-pill px-3 py-2">Daily Streak: 5 🔥</span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-3">Activity Summary</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Join Date</span>
                    <span className="fw-semibold">{new Date(user.date).toLocaleDateString()}</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span className="text-muted">Membership</span>
                    <span className="badge bg-success-subtle text-success">Lifetime</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-3">Security</h5>
                <button className="btn btn-sm btn-outline-primary w-100 mb-2">Change Password</button>
                <button className="btn btn-sm btn-outline-primary w-100 mb-2">Enable 2FA</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
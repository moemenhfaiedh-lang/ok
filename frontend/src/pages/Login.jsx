import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      const res = await axios.post('/api/auth/login', formData);

      
      localStorage.setItem('token', res.data.token);
      
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid Credentials. Please try again.');
    }
  };

  return (
    <div className="login-page" style={pageStyle}>
      <div className="login-card" style={cardStyle}>
        <h1 style={{ color: '#2d3436', marginBottom: '0.5rem' }}>Welcome Back</h1>
        <p style={{ color: '#636e72', marginBottom: '2rem' }}>Login to track your progress.</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div style={inputGroup}>
            <label style={labelStyle}>Email Address</label>
            <input
              style={inputStyle}
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#00cec9', fontWeight: '600' }}>Create one</Link>
        </div>
      </div>
    </div>
  );
};


const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
};

const cardStyle = {
  background: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const inputGroup = {
  textAlign: 'left',
  marginBottom: '1.5rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: '#2d3436'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #dfe6e9',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const errorStyle = {
  background: '#ffeaa7',
  color: '#d63031',
  padding: '10px',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  fontSize: '0.85rem',
  fontWeight: '500'
};

export default Login;
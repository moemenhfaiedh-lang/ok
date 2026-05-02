import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      
      localStorage.setItem('token', res.data.token);
      
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page" style={pageStyle}>
      <div className="register-card" style={cardStyle}>
        <h1 style={{ color: '#2d3436', marginBottom: '0.5rem' }}>Join IronPulse</h1>
        <p style={{ color: '#636e72', marginBottom: '2rem' }}>Create an account to start tracking.</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div style={inputGroup}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="moemen hf"
              required
            />
          </div>

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
              placeholder="At least 6 characters"
              minLength="6"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              style={inputStyle}
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Repeat password"
              required
            />
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Create Account
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/" style={{ color: '#00cec9', fontWeight: '600' }}>Login</Link>
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
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: '20px'
};

const cardStyle = {
  background: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center'
};

const inputGroup = {
  textAlign: 'left',
  marginBottom: '1.2rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.4rem',
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
  outline: 'none'
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

export default Register;
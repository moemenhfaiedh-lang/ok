import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const styles = {
    primary: { background: '#00cec9', color: '#fff' },
    danger: { background: '#ff7675', color: '#fff' },
    outline: { background: 'transparent', border: '1px solid #00cec9', color: '#00cec9' }
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`custom-btn ${variant}`}
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        ...styles[variant]
      }}
    >
      {children}
    </button>
  );
};

export default Button;
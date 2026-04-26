import React from 'react';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div className="spinner"></div>
      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #00cec9;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Loader;
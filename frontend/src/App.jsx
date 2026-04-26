import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="vh-100 d-flex flex-column">
      {/*  Global Navbar */}
      {!isAuthPage && <Navbar />}

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/*  Sidebar  */}
        {!isAuthPage && <Sidebar />}

        {/* Main Content Area */}
        <div className={`flex-grow-1 ${!isAuthPage ? 'overflow-auto bg-light' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Private Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute> <Dashboard /> </ProtectedRoute>
            } />
            
            <Route path="/workouts" element={
              <ProtectedRoute> <Workouts /> </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute> <Profile /> </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute> <Settings /> </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
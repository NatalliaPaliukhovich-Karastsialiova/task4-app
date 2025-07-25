import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState, useEffect } from 'react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

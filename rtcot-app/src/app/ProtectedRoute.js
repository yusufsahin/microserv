import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// ProtectedRoute.js
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLogon);

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;  // Correct export

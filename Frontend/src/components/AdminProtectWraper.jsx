import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminProtectWraper = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (!token || user.role !== 'admin') {
    return <Navigate to="/pollin-page" replace />;
  }

  return children;
};

export default AdminProtectWraper;

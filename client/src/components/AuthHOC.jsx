import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthHOC = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const token = localStorage.getItem('token');
    const isAuth = !!token;

    if (!isAuth) {
      // Redirect to the home page if not authenticated
      return <Navigate to="/" />;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AuthHOC;

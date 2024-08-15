import React from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast } from "./toastUtils"

const AuthHOC = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const token = localStorage.getItem('token');
    const isAuth = !!token;

    if (!isAuth) {
      // Redirect to the home page if not authenticated
      showErrorToast('You are not authenticated');

      // Redirect to the home page and stop rendering the component
      return  setTimeout(() => {
        <Navigate to="/" />
      }, 2000); // 2 seconds delay;
    }

    // Render the wrapped component if authenticated
    return (
      <>
        <WrappedComponent {...props} />
        <ToastContainer />
      </>
    );
  };

  return AuthComponent;
};

export default AuthHOC;

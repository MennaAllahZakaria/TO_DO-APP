import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showSuccessToast,showErrorToast} from './toastUtils'
const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = ({handleLogin}) => {
  const [serverError, setServerError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token
        if (handleLogin) handleLogin();
        console.log("Login successful")
        
        const User=await axios.get(`${API_URL}/api/users/getMe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const name =User.data.data.name
        showSuccessToast(`Welcome back ,${name}`);
        // Redirect to tasks page
        setTimeout(() => {
          window.location.href = '/tasks';
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      console.log(error);
      showErrorToast('Something went wrong');
      setServerError(error.response?.data?.message );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field name="email" type="email" className="form-control" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field name="password" type="password" className="form-control" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-primary">Forgot your password?</a>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

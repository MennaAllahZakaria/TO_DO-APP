import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showSuccessToast,showErrorToast} from './toastUtils'

const API_URL = import.meta.env.VITE_API_URL;
const SignUpPage = () => {
  const [serverError, setServerError] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError(''); // Clear previous errors

    try {
      // Convert values to JSON
      // Create user
      const response = await axios.post(`${API_URL}/api/auth/signup`, values, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201|| response.status === 200) {
        showSuccessToast(`Welcome, ${values.name}!`);
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token
        // Redirect to a tasks page
        setTimeout(() => {
          window.location.href = '/tasks';
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      if (error.response) {
        showErrorToast('Sign up failed please try again')
        setServerError(error.response.data.message  );
      } else if (error.request) {
        // Request was made but no response received
        setServerError('No response from server');
      } else {
        // Something else happened
        setServerError('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Create Your Account</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <Field name="phone" type="text" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                <Field name="passwordConfirm" type="password" className="form-control" />
                <ErrorMessage name="passwordConfirm" component="div" className="text-danger small" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p className="mb-0">Have an account already? <a href="/login" className="text-primary">Login</a></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;

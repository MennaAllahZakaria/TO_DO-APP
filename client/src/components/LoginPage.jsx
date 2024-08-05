import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [serverError, setServerError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token
        // Redirect to a secure page or dashboard
        // window.location.href = '/dashboard';
        console.log("Login successful")
      }
    } catch (error) {
      console.log(error);
      setServerError(error.response?.data?.message || 'Something went wrong');
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
          <p className="mb-0">Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

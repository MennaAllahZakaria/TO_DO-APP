import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showSuccessToast,showErrorToast} from './toastUtils'
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const ForgotPasswordPage = () => {
  const [serverError, setServerError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgotPassword`, {
        email: values.email,
      });

      if (response.status === 200) {
        setIsCodeSent(true);
        showSuccessToast('Password reset email sent successfully. Please check your inbox.');
        // Navigate to ResetPasswordPage and pass the email
        setTimeout(() => {
          navigate('/reset-password', { state: { email: values.email } });
        }
        ,2000);
      } else {
        showErrorToast('Failed to send password reset email.');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Formik
          initialValues={{
            email: '',
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
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : isCodeSent ? 'Resend Reset Link' : 'Send Reset Link'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;

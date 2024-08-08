import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPasswordPage = () => {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset code is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm your new password'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/resetPassword', {
        resetCode: values.resetCode,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset successfully! You can now log in with your new password.');
        console.log('Password reset successfully');
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
        <h2 className="text-center mb-4">Reset Password</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <Formik
          initialValues={{
            resetCode: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="resetCode" className="form-label">Reset Code</label>
                <Field name="resetCode" type="text" className="form-control" placeholder="Enter the reset code" />
                <ErrorMessage name="resetCode" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <Field name="newPassword" type="password" className="form-control" placeholder="Enter your new password" />
                <ErrorMessage name="newPassword" component="div" className="text-danger small" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <Field name="confirmPassword" type="password" className="form-control" placeholder="Confirm your new password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

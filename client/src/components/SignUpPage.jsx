import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
  const [serverError, setServerError] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
    profileImage: Yup.mixed(),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('profileImage', values.profileImage);
    formData.append('password', values.password);

    try {
        // Convert the FormData object to JSON
        const jsonData = JSON.stringify(values);
      const response = await axios.post(`http://localhost:8000/api/auth/signup`, jsonData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token
        // Redirect to a secure page or dashboard
        // window.location.href = '/dashboard';
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
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Create Your Account</h2>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            profileImage: null,
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
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
                <label htmlFor="profileImage" className="form-label">Profile Image</label>
                <input
                  name="profileImage"
                  type="file"
                  className="form-control"
                  onChange={(event) => setFieldValue('profileImage', event.currentTarget.files[0])}
                />
                <ErrorMessage name="profileImage" component="div" className="text-danger small" />
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
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;

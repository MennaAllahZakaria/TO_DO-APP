import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHOC from './AuthHOC';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showSuccessToast,showErrorToast} from './toastUtils'

const API_URL = import.meta.env.VITE_API_URL;

const UserInfoPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/users/getMe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        showErrorToast('Failed to load user info')
        setError('Failed to load user info');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card" style={{ backgroundColor: '#f0f8ff', border: 'none', borderRadius: '10px' }}>
        <div className="card-body text-center">
          <div>
            <img
              src={'https://cdn.pixabay.com/photo/2013/07/13/12/33/man-159847_1280.png'}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <h2 className="card-title" style={{ color: '#007bff' }}>{user.name}</h2>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p className="card-text"><strong>Role:</strong> {user.role}</p>
          <p className="card-text"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="card-text"><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AuthHOC(UserInfoPage);





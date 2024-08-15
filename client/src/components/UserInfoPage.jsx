import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHOC from './AuthHOC';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast, showErrorToast } from './toastUtils';

const API_URL = import.meta.env.VITE_API_URL;

const UserInfoPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

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
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone || '',
        });
        setLoading(false);
      } catch (err) {
        showErrorToast('Failed to load user info');
        setError('Failed to load user info');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/users/updateMe`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      showSuccessToast('User info updated successfully');
      setEditMode(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      showErrorToast('Failed to update user info');
      setError('Failed to update user info');
    }
  };
  

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card" style={{ backgroundColor: '#f0f8ff', border: 'none', borderRadius: '10px' }}>
        <div className="card-body text-center">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3 ml-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
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
              <button
                className="btn btn-warning"
                onClick={() => setEditMode(true)}
              >
                Edit Info
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthHOC(UserInfoPage);

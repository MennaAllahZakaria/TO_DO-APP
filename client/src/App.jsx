import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ContactUs from './components/ContactUs';
import HomePage from './components/Home';
import TasksPage from './components/TaskPage';
import UserInfoPage from './components/UserInfoPage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage or API
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const Layout = () => (
    <>
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
      <Outlet />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} handleLogin={handleLogin}  />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="user-info" element={<UserInfoPage />} />    
          <Route path="forgot-password" element={<ForgotPasswordPage/>} />
          <Route path="reset-password" element={<ResetPasswordPage/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

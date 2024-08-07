import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ContactUs from './components/ContactUs';
import HomePage from './components/Home';
import TasksPage from './components/TaskPage';
import UserInfoPage from './components/UserInfoPage';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const Layout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="user-info" element={<UserInfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

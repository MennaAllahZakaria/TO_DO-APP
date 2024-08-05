import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import ContactUs from './components/ContactUs';
import HomePage from './components/Home';
import NavBar from './components/NavBar';

function App() {
  const Layout = () => (
    <>
      <NavBar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

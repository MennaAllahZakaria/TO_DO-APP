import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate here

  const onLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    handleLogout(); // Call handleLogout if provided
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TO-Do</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} 
                to="/" 
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} 
                to="/contactus"
              >
                Contact Us
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} 
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} 
                    to="/tasks"
                  >
                    Tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} 
                    to="/user-info"
                  >
                    User Info
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-light" 
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

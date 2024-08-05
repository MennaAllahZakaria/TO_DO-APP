import React from 'react';
import { Link, NavLink } from "react-router-dom";

export default function NavBar({ count }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TO-Do</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/" end>Home</NavLink>
            </li>
            
            <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="ContactUs">Contact Us</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="signup">SignUp</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="login">Login</NavLink>
            </li>
            
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

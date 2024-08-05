import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center mb-4">
        <h1 className="display-4 mb-3">Welcome to To-Do App</h1>
        <p className="lead mb-4">
          Manage your tasks efficiently and stay organized with our intuitive To-Do app. 
          Whether you're tracking personal goals or work assignments, our app helps you 
          keep everything in check with ease.
        </p>
        <p className="mb-4">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-group mb-4">
          <li className="list-group-item">✔ Create, edit, and delete tasks</li>
          <li className="list-group-item">✔ Set due dates and priorities</li>
          <li className="list-group-item">✔ Receive notifications for upcoming tasks</li>
          <li className="list-group-item">✔ User authentication and secure access</li>
          <li className="list-group-item">✔ Responsive design for any device</li>
        </ul>
        <p>
          Get started by <a href="/login" className="btn btn-primary">logging in</a> or <a href="/signup" className="btn btn-secondary">signing up</a>!
        </p>
      </div>
    </div>
  );
};

export default HomePage;

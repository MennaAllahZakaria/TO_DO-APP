import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
  return (
    <Container className="text-center mt-5">
      <div className="not-found-container p-5 rounded shadow-sm">
        <h1 className="display-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" href="/">
          Go Back to Home
        </Button>
      </div>
    </Container>
  );
}

// src/pages/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingPage() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to AskMama</h1>
      <p>Your go-to place for questions, answers, and advice.</p>
      <Button as={Link} to="/login" variant="primary" className="me-2">
        Login
      </Button>
      <Button as={Link} to="/register" variant="secondary">
        Register
      </Button>
    </div>
  );
}

export default LandingPage;
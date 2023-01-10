import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  return (
    <div className="error_page">
      <Container>
        <Container id="error_page_container">
          <div id="error_block">
            <h2>An Error Occurred!</h2>
            <p>Something went wrong!</p>
            <Link to="/">back</Link>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ErrorPage;

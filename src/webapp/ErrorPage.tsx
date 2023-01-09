import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import './ErrorPage.css';
import ErrorTop from '../components/errorTop';

function ErrorPage() {
  return (
    <div className="error_page">
      <Container>
        {/* top: include instructions for use and task text */}
        <ErrorTop />

        {/* main field */}
        <Container id="error_page_container">
          <div id="error_block">
            <h2>An Error Occurred!</h2>
            <p>Something went wrong!</p>
            <Link to="/">back</Link>
          </div>
        </Container>
      </Container>

      {/* foot */}
      <Footer />
    </div>
  );
}

export default ErrorPage;

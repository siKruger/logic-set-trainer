import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h1>An Error Occured!</h1>
      <p>
        Something went wrong!
      </p>
      <Link to="/">back</Link>
    </div>
  );
}

export default ErrorPage;

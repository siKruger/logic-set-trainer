import React from 'react';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
      <Link to="truthtable"> Truthtable </Link>
      <Link to="venn"> Venn </Link>
      <h1> Landing Page</h1>
    </>
  );
}

export default Landingpage;

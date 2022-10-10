import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h1> HEADER </h1>
      <Outlet />
      <h1> FOOTER </h1>
    </div>
  );
}

export default Layout;

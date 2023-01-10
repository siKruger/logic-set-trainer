import React from 'react';
import { Outlet } from 'react-router-dom';
import Top from '../components/top';
import './common.css';
import Footer from '../components/footer';

function Layout() {
  return (
    <div className="page">
      <div>
        <Top />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

import React from 'react';
import Top from '../components/top';
import './common.css';
import Main from '../components/main';
import Footer from '../components/footer';

function Layout() {
  return (
    <div className="page">
      <div>
        {/* top: include instructions for use and task text */}
        <Top />
        {/* main field */}
        <Main />
      </div>

      {/* foot */}
      <Footer />
    </div>
  );
}

export default Layout;

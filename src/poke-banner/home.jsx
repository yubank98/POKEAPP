import React from 'react';
import Dashboard from './dashboard';
import NavBar from './navbar';
import Banner from './banner';
import Footer from './footer';

function Home() {
  return (
    <div>
        <NavBar />
        <Banner />
        <Dashboard />
        <Footer />
    </div>
  );
}

export default Home;

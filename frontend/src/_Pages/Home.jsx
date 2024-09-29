// Home.jsx

import React from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../_components/Footer';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
    <div>
      <HeroSection />
      <Footer />
    </div></Layout>
  );
};

export default Home;

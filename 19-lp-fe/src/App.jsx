import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import ScrollToTopButton from './components/ScrollToTopButton';

const App = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <ProductList />
      <ScrollToTopButton />
    </div>
  );
};

export default App;

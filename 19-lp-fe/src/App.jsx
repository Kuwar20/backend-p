import React from 'react';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import ScrollToTopButton from './components/ScrollToTopButton';

const App = () => {
  return (
    <div className="font-sans">
      <HeroSection />
      <ProductList />
      <ScrollToTopButton />
    </div>
  );
};

export default App;

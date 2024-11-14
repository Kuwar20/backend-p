// src/App.jsx
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <CartProvider>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold p-4">Shopping App</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
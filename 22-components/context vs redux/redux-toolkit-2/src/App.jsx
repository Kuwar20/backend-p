// src/App.jsx
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold p-4">Shopping App</h1>
        <ProductList />
        <Cart />
      </div>
    </Provider>
  );
};

export default App;
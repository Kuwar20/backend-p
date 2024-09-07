import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../app/slice/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Continue shopping</Link>.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition ease-in-out duration-300"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              Total: <span className="text-green-500">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition ease-in-out duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

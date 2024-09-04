// src/pages/Cart.js

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="mb-6">
            {cartItems.map((item) => (
              <li key={item._id} className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</div>
          <Link
            to="/checkout"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;

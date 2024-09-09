import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../app/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between p-4 border-b">
                <span>{item.title}</span>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl">Total: ${totalPrice}</p>
            <button
              className="bg-green-500 text-white p-3 rounded mt-4"
              onClick={() => navigate('/payment')}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

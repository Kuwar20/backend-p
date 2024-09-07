import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        payment: paymentReducer,
    },
});

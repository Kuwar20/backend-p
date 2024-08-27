import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/slices/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

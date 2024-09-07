import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPaymentIntent = createAsyncThunk(
    'payment/createPaymentIntent',
    async (amount) => {
        const response = await axios.post('http://localhost:4000/api/payment/create-payment-intent', { amount });
        return response.data;
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        clientSecret: '',
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.clientSecret = action.payload.clientSecret;
                state.loading = false;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default paymentSlice.reducer;

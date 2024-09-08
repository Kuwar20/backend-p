// In your Redux slice (paymentSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPaymentIntent = createAsyncThunk(
    'payment/createPaymentIntent',
    async (amount) => {
        console.log('Creating payment intent with amount:', amount);
        const response = await axios.post('http://localhost:4000/api/payment/create-payment-intent', { amount });
        console.log('Received client secret:', response.data.clientSecret);
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
    reducers: {
        clearClientSecret: (state) => {
            state.clientSecret = '';
        },
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

export const { clearClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;
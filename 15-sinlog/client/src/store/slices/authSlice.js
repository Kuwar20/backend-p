import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decodedToken = jwtDecode(token);
            return { user: decodedToken, token };   
            // return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', { name, email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
                toast.success('Login successful');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || 'An error occurred during login';
                toast.error(action.payload.error); // Display backend error message
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;
                toast.success('Signup successful');
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || 'An error occurred during signup';
                toast.error(action.payload.error); // Display backend error message
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
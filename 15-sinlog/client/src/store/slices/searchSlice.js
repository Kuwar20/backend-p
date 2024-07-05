import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchUsers = createAsyncThunk(
    'search/searchUsers',
    async ({ query, page, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/search/${query}`, {
                params: { name: query, page, limit },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    query: '',
    results: [],
    loading: false,
    currentPage: 1,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSuggestion: (state, action) => {
            state.suggestion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export const { setQuery, setCurrentPage,setSuggestion } = searchSlice.actions;
export default searchSlice.reducer;
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import searchReducer from './slices/searchSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
});

export default rootReducer;
// src/utils/axiosInstance.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com', // Fake Store API URL
});

export default instance;

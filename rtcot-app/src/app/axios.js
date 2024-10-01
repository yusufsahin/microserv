// src/app/axios.js
import axios from 'axios';

// Create an instance of Axios
const instance = axios.create();

// Add an interceptor to include the JWT token and Content-Type in headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Add token to Authorization header
  }
  config.headers['Content-Type'] = 'application/json';  // Set Content-Type header for all requests
  return config;
}, (error) => {
  return Promise.reject(error);  // Handle request errors
});

// Export the custom Axios instance
export default instance;


import axios from 'axios';

export const fetchProducts = () => {
  return axios.get('/api/products'); // your Express server endpoint
};
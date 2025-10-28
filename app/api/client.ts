import axios from 'axios';

const baseURL = 'http://localhost:5555';

const client = axios.create({
  baseURL,
});

export default client;

export const NetworkRoutes = {
  singUp: '/auth/sign-up',
  login: '/auth/sign-in',
  isAuth: 'auth/is-auth',
  getProducts: 'product/products',
};

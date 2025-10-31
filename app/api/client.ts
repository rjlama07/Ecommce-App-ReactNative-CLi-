import axios from 'axios';

const baseURL = 'http://192.168.0.164:5555';

const client = axios.create({
  baseURL,
});

export default client;

export const NetworkRoutes = {
  singUp: '/auth/sign-up',
  login: '/auth/sign-in',
  isAuth: 'auth/is-auth',
  uplodProfile: 'auth/profile-image',
  getProducts: 'product/products',
  getCategories: 'product/categories',
  productDetail: (id: string) => `/product/detail/${id}`,
};

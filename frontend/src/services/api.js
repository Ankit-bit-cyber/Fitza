import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitza_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fitza_token');
      localStorage.removeItem('fitza_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ───────────────────────────────────────────────
export const registerApi  = (data) => api.post('/auth/register', data);
export const loginApi     = (data) => api.post('/auth/login', data);
export const getProfileApi = ()    => api.get('/auth/me');

// ─── Products ───────────────────────────────────────────
export const getProductsApi      = (params) => api.get('/products', { params });
export const getProductByIdApi   = (id)     => api.get(`/products/${id}`);
export const getFilterOptionsApi = ()       => api.get('/products/filters');

// ─── Cart ───────────────────────────────────────────────
export const getCartApi        = ()                    => api.get('/cart');
export const addToCartApi      = (productId, quantity) => api.post('/cart', { productId, quantity });
export const updateCartItemApi = (productId, quantity) => api.put(`/cart/${productId}`, { quantity });
export const removeCartItemApi = (productId)           => api.delete(`/cart/${productId}`);
export const clearCartApi      = ()                    => api.delete('/cart/clear');

// ─── Orders ─────────────────────────────────────────────
export const placeOrderApi   = (shippingAddress) => api.post('/order', { shippingAddress });
export const getMyOrdersApi  = ()                => api.get('/order');
export const getOrderByIdApi = (id)              => api.get(`/order/${id}`);

export default api;
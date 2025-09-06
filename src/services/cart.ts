import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getCartList = () => apiClient.get(API_ENDPOINTS.cart.list);
export const addToCart = (data: any) => apiClient.post(API_ENDPOINTS.cart.add, data);
export const updateCart = (data: any) => apiClient.post(API_ENDPOINTS.cart.update, data);
export const removeFromCart = (data: any) => apiClient.post(API_ENDPOINTS.cart.remove, data);
export const removeCartItem = (data: any) => apiClient.post(API_ENDPOINTS.cart.removeItem, data);
export const addMultipleToCart = (data: any) => apiClient.post(API_ENDPOINTS.cart.addMultiple, data);

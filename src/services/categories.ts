import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getCategories = () => apiClient.get(API_ENDPOINTS.categories.get);
export const getChildCategories = (id: string) => apiClient.get(API_ENDPOINTS.categories.childes(id));
export const getCategoryProducts = (id: string) => apiClient.get(API_ENDPOINTS.categories.productsAll(id));
export const getCategoryRestaurants = (id: string) => apiClient.get(API_ENDPOINTS.categories.restaurants(id));

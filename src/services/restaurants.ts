import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getRestaurants = () => apiClient.get(API_ENDPOINTS.restaurants.get);
export const getPopularRestaurants = () => apiClient.get(API_ENDPOINTS.restaurants.popular);
export const getLatestRestaurants = () => apiClient.get(API_ENDPOINTS.restaurants.latest);
export const getRestaurantDetails = (id: string) => apiClient.get(API_ENDPOINTS.restaurants.details(id));
export const getRestaurantReviews = () => apiClient.get(API_ENDPOINTS.restaurants.reviews);
export const getRecentlyViewedRestaurants = () => apiClient.get(API_ENDPOINTS.restaurants.recentlyViewed);
export const getDineInRestaurants = () => apiClient.get(API_ENDPOINTS.restaurants.dineIn);

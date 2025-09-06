import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getCouponList = () => apiClient.get(API_ENDPOINTS.coupons.list);
export const getRestaurantWiseCoupon = () => apiClient.get(API_ENDPOINTS.coupons.restaurantWise);
export const applyCoupon = (code: string) => apiClient.get(API_ENDPOINTS.coupons.apply(code));

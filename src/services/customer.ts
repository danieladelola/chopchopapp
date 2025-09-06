import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getCustomerInfo = () => apiClient.get(API_ENDPOINTS.customer.info);
export const updateCustomerProfile = (data: any) => apiClient.post(API_ENDPOINTS.customer.updateProfile, data);
export const removeCustomerAccount = () => apiClient.delete(API_ENDPOINTS.customer.removeAccount);
export const updateCustomerInterest = (data: any) => apiClient.put(API_ENDPOINTS.customer.updateInterest, data);
export const getSuggestedFoods = () => apiClient.get(API_ENDPOINTS.customer.suggestedFoods);
export const getCustomerFoodList = () => apiClient.get(API_ENDPOINTS.customer.foodList);

import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getNotifications = () => apiClient.get(API_ENDPOINTS.customer.notifications);

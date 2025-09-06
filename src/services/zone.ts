import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getZoneId = () => apiClient.get(API_ENDPOINTS.zone.getZoneId);
export const checkZone = (data: any) => apiClient.post(API_ENDPOINTS.zone.check, data);
export const getZoneList = () => apiClient.get(API_ENDPOINTS.zone.list);
export const updateZone = (data: any) => apiClient.put(API_ENDPOINTS.customer.updateZone, data);

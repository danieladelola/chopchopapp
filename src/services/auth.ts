import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const signUp = (data: any) => apiClient.post(API_ENDPOINTS.auth.signUp, data);
export const login = (data: any) => apiClient.post(API_ENDPOINTS.auth.login, data);
export const forgotPassword = (data: any) => apiClient.post(API_ENDPOINTS.auth.forgotPassword, data);
export const verifyToken = (data: any) => apiClient.post(API_ENDPOINTS.auth.verifyToken, data);
export const resetPassword = (data: any) => apiClient.post(API_ENDPOINTS.auth.resetPassword, data);
export const verifyPhone = (data: any) => apiClient.post(API_ENDPOINTS.auth.verifyPhone, data);
export const checkEmail = (data: any) => apiClient.post(API_ENDPOINTS.auth.checkEmail, data);
export const verifyEmail = (data: any) => apiClient.post(API_ENDPOINTS.auth.verifyEmail, data);
export const guestLogin = () => apiClient.post(API_ENDPOINTS.auth.guestLogin);

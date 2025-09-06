import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const placeOrder = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.place, data);
export const trackOrder = (id: string) => apiClient.get(API_ENDPOINTS.customer.order.track(id));
export const getRunningOrders = () => apiClient.get(API_ENDPOINTS.customer.order.runningOrders);
export const getOrderSubscriptionList = () => apiClient.get(API_ENDPOINTS.customer.order.orderSubscriptionList);
export const getOrderList = () => apiClient.get(API_ENDPOINTS.customer.order.list);
export const getOrderDetails = (id: string) => apiClient.get(API_ENDPOINTS.customer.order.details(id));
export const cancelOrder = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.cancel, data);
export const getCancellationReasons = () => apiClient.get(API_ENDPOINTS.customer.order.cancellationReasons);
export const getRefundReasons = () => apiClient.get(API_ENDPOINTS.customer.order.refundReasons);
export const refundRequest = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.refundRequest, data);
export const getPaymentMethod = () => apiClient.get(API_ENDPOINTS.customer.order.paymentMethod);
export const sendOrderNotification = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.sendNotification, data);
export const checkRestaurantValidation = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.checkRestaurantValidation, data);
export const orderAgain = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.orderAgain, data);
export const submitOfflinePayment = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.offlinePayment, data);
export const updateOfflinePayment = (data: any) => apiClient.post(API_ENDPOINTS.customer.order.offlinePaymentUpdate, data);

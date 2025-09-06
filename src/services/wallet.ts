import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getWalletTransactions = () => apiClient.get(API_ENDPOINTS.customer.wallet.transactions);
export const addWalletFund = (data: any) => apiClient.post(API_ENDPOINTS.customer.wallet.addFund, data);
export const getWalletBonuses = () => apiClient.get(API_ENDPOINTS.customer.wallet.bonuses);
export const getLoyaltyPointTransactions = () => apiClient.get(API_ENDPOINTS.customer.loyaltyPoint.transactions);
export const transferLoyaltyPoints = (data: any) => apiClient.post(API_ENDPOINTS.customer.loyaltyPoint.pointTransfer, data);
export const getOfflinePaymentMethods = () => apiClient.get(API_ENDPOINTS.offlinePayment.list);

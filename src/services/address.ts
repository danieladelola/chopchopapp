import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export interface Address {
  id?: number;
  address: string;
  latitude: number;
  longitude: number;
  address_type: string;
  contact_person_name: string;
  contact_person_number: string;
  road?: string;
  house?: string;
  floor?: string;
}

export const getAddresses = () => apiClient.get(API_ENDPOINTS.customer.address.list);
export const addAddress = (data: Omit<Address, 'id'>) => apiClient.post(API_ENDPOINTS.customer.address.add, data);
export const updateAddress = (id: number, data: Omit<Address, 'id'>) => apiClient.put(API_ENDPOINTS.customer.address.update(id), data);
export const deleteAddress = (addressId: number) => apiClient.delete(API_ENDPOINTS.customer.address.delete, { params: { address_id: addressId } });
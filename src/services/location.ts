import Geolocation from '@react-native-community/geolocation'; // New import
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        console.error('Failed to get user location:', error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

export const getAvailableZones = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.zone.list); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('Failed to fetch zones:', error);
    return [];
  }
};

export const checkZone = async (lat: number, lng: number, zoneId: number) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.zone.check, { // Corrected endpoint
      lat,
      lng,
      zone_id: zoneId,
    });
    return response.data; // This will be true or false
  } catch (error) {
    console.error('Failed to check zone:', error);
    return false;
  }
};

export const setZoneInStorage = async (zoneId: number) => {
  try {
    await AsyncStorage.setItem('zoneId', zoneId.toString());
    console.log('Zone ID saved to AsyncStorage:', zoneId);
  } catch (error) {
    console.error('Failed to save zone ID to AsyncStorage:', error);
  }
};

import { GOOGLE_MAPS_API_KEY } from '../config';

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Failed to get address from coordinates:', error);
    return null;
  }
};

export const geocodeAddress = async (address: string) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng, formattedAddress: data.results[0].formatted_address };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to geocode address:', error);
    return null;
  }
};
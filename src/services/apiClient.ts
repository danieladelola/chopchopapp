import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { BASE_URL, API_ENDPOINTS } from './apiConfig';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    const zoneId = await AsyncStorage.getItem('zoneId'); // Assuming zoneId is stored here
    const longitude = await AsyncStorage.getItem('longitude'); // Assuming longitude is stored here
    const latitude = await AsyncStorage.getItem('latitude'); // Assuming latitude is stored here

    console.log('Token from AsyncStorage:', token);
    console.log('ZoneId from AsyncStorage:', zoneId);
    console.log('Longitude from AsyncStorage:', longitude);
    console.log('Latitude from AsyncStorage:', latitude);

    // Only add Authorization header if the endpoint is not customer info
    if (token && config.url !== API_ENDPOINTS.customer.info) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (zoneId) {
      console.log('Setting zoneId header:', zoneId);
      config.headers.zoneId = zoneId;
    }
    if (longitude) {
      config.headers.longitude = longitude;
    }
    if (latitude) {
      config.headers.latitude = latitude;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

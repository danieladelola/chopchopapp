import apiClient from './apiClient';

export const getBanners = async (zoneId, longitude, latitude) => {
  try {
    const headers = {
      zoneId: JSON.stringify(zoneId),
      longitude: longitude,
      latitude: latitude,
    };
    const response = await apiClient.get('/api/v1/banners/', { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

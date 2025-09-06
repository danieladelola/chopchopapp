import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export const getLatestProducts = (restaurant_id: number, category_id: number, limit: number, offset: number) => apiClient.get(API_ENDPOINTS.products.latest, { params: { restaurant_id, category_id, limit, offset } });
export const getPopularProducts = () => apiClient.get(API_ENDPOINTS.products.popular);
export const getMostReviewedProducts = () => apiClient.get(API_ENDPOINTS.products.mostReviewed);
export const getSetMenuProducts = () => apiClient.get(API_ENDPOINTS.products.setMenu);
export const getRecommendedProducts = () => apiClient.get(API_ENDPOINTS.products.recommended);
export const getProductDetails = (id: string) => apiClient.get(API_ENDPOINTS.products.details(id));
export const submitProductReview = (data: any) => apiClient.post(API_ENDPOINTS.products.submitReview, data);
export const getRecommendedMostReviewedProducts = () => apiClient.get(API_ENDPOINTS.products.recommendedMostReviewed);

export const getProductReviews = async (productId: string) => {
  // In a real application, this would make an API call to fetch reviews
  // For now, returning dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, user: 'Alice', rating: 5, comment: 'Great product!', productId: '123' },
        { id: 2, user: 'Bob', rating: 4, comment: 'Good value for money.', productId: '123' },
        { id: 3, user: 'Charlie', rating: 3, comment: 'It was okay.', productId: '456' },
      ].filter(review => review.productId === productId));
    }, 500);
  });
};

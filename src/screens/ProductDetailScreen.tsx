import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist

import { getProductReviews } from '../services/products'; // Import the new function

// Assuming a product details API call would look something like this
// import { getProductDetails } from '../services/products';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params; // Get productId from navigation params
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isItemInWishlist, addItemToWishlist, removeItemFromWishlist } = useWishlist(); // Use wishlist context

  const isInWishlist = isItemInWishlist(productId);

  const handleWishlistToggle = async () => {
    if (isInWishlist) {
      await removeItemFromWishlist(productId);
      Alert.alert('Removed', 'Item removed from wishlist.');
    } else {
      // For now, we're using dummy product data. In a real app, you'd pass more product info.
      // The `addItemToWishlist` function in context expects an `id`.
      // If the API expects more, you'd need to adjust `addItemToWishlist` in `WishlistContext`
      // and pass the full product object here.
      await addItemToWishlist(productId);
      Alert.alert('Added', 'Item added to wishlist.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch product details here
        // const productData = await getProductDetails(productId);
        
        // Placeholder data for demonstration
        setProduct({
          id: productId,
          name: `Product ${productId}`,
          description: `This is a detailed description for product ${productId}.`,
          price: 19.99,
        });

        const fetchedReviews = await getProductReviews(productId); // Fetch reviews
        setReviews(fetchedReviews);

      } catch (error) {
        console.error('Error fetching product details or reviews:', error);
        Alert.alert('Error', 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#074425" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
        <TouchableOpacity onPress={handleWishlistToggle}>
          <MaterialIcons
            name={isInWishlist ? 'favorite' : 'favorite-border'}
            size={28}
            color={isInWishlist ? '#ef5123' : '#272f31'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={styles.submitReviewButton}
        onPress={() => navigation.navigate('ReviewSubmission', { productId: product.id })}
      >
        <Text style={styles.submitReviewButtonText}>Submit a Review</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      {reviews.length === 0 ? (
        <Text>No reviews yet. Be the first to review!</Text>
      ) : (
        reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{review.user} - Rating: {review.rating}/5</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#074425',
    flexShrink: 1, // Allow text to shrink
    marginRight: 10, // Space between title and icon
  },
  price: {
    fontSize: 22,
    color: '#ef5123',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#272f31',
    marginBottom: 20,
  },
  submitReviewButton: {
    backgroundColor: '#fbb216',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitReviewButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 15,
  },
  reviewItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#272f31',
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#272f31',
  },
});

export default ProductDetailScreen;

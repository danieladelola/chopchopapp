import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { submitProductReview } from '../services/products'; // Assuming this is the correct path

const ReviewSubmissionScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Assuming productId is passed as a param
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText) {
      Alert.alert('Error', 'Please provide both a rating and a review.');
      return;
    }

    setLoading(true);
    try {
      await submitProductReview({
        productId: productId,
        rating: parseFloat(rating),
        review: reviewText,
      });
      Alert.alert('Success', 'Review submitted successfully!');
      navigation.goBack(); // Go back to the previous screen after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Your Review</Text>
      <Text style={styles.label}>Rating (1-5):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g., 4.5"
        value={rating}
        onChangeText={setRating}
        maxLength={3}
      />
      <Text style={styles.label}>Your Review:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
        placeholder="Write your review here..."
        value={reviewText}
        onChangeText={setReviewText}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmitReview}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit Review'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#272f31',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#272f31',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ef5123',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewSubmissionScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/AppStyles';

const HowToScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How-To Guide</Text>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>1. Sign Up</Text>
        <Text style={styles.stepDescription}>Download the app, enter your details, and verify your account.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>2. Browse Food</Text>
        <Text style={styles.stepDescription}>Search by restaurant, cuisine, or dish. Tap to see details.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>3. Place an Order</Text>
        <Text style={styles.stepDescription}>Select items, add to cart, and confirm your order with payment.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>4. Track Your Order</Text>
        <Text style={styles.stepDescription}>Go to “My Orders” to see real-time delivery updates.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>5. Cancel an Order</Text>
        <Text style={styles.stepDescription}>Cancel quickly before vendor accepts. After that, follow vendor rules.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>6. Make Payments</Text>
        <Text style={styles.stepDescription}>Use card, Apple/Google Pay, or other in-app payment methods.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>7. Contact Support</Text>
        <Text style={styles.stepDescription}>Use the “Help” or “Support” section in the app for questions or complaints.</Text>
      </View>

      <View style={styles.howToItem}>
        <Text style={styles.stepTitle}>8. Leave Feedback</Text>
        <Text style={styles.stepDescription}>Rate your food and delivery to help improve service.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  title: {
    fontSize: Typography.fontSize.xLarge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginBottom: Spacing.large,
    textAlign: 'center',
  },
  howToItem: {
    marginBottom: Spacing.medium,
  },
  stepTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginBottom: Spacing.tiny,
  },
  stepDescription: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    lineHeight: Typography.fontSize.medium * 1.5,
  },
});

export default HowToScreen;

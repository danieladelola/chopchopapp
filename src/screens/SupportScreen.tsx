import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SupportScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hello, how can we help?</Text>
          <TouchableOpacity style={styles.chatsButton}>
            <Ionicons name="chatbubbles-outline" size={20} color="#074425" />
            <Text style={styles.chatsButtonText}>Chats</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Order Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need help with a recent order</Text>
          <View style={[styles.card, styles.recentOrderCard]}>
            <View style={styles.orderStatus}>
              <View style={styles.greenDot} />
              <Text style={styles.restaurantName}>Restaurant Name</Text>
            </View>
            <View>
              <Text style={styles.deliveryInfo}>Delivery Date and Time</Text>
              <Text style={styles.orderNumber}>Order #12345</Text>
            </View>
          </View>
        </View>

        {/* Other Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need help with something else?</Text>
          <TouchableOpacity style={styles.card}>
            <View style={styles.otherHelpContent}>
              <Ionicons name="headset-outline" size={24} color="#074425" />
              <Text style={styles.otherHelpText}>
                Have an issue with payments, your account, subscriptions or promotions. Speak to our support team.
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#888" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    backgroundColor: '#074425', // Dark Green
    padding: 20,
    borderRadius: 10, // Rounded corners for the header
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // TODO: Add wavy pattern
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  chatsButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatsButtonText: {
    color: '#074425', // Dark Green
    fontWeight: 'bold',
    marginLeft: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888', // Gray
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#074425', // Dark Green
    marginRight: 5,
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#888', // Gray
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 14,
    color: '#ccc', // Light Gray
    textAlign: 'right',
  },
  recentOrderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherHelpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otherHelpText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },
});

export default SupportScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRestaurants } from '../services/api';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  // Add other restaurant properties like rating, image, etc.
}

const RestaurantListScreen = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch all restaurants for now, can be extended with popular/latest later
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        Alert.alert('Error', 'Failed to fetch restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#074425" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.restaurantItem}
            onPress={() => navigation.navigate('RestaurantDetailScreen', { restaurantId: item.id, restaurantName: item.name })}
          >
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDescription}>{item.description}</Text>
            {/* Add more restaurant details here */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No restaurants available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 20,
  },
  restaurantItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#272f31',
    marginBottom: 5,
  },
  restaurantDescription: {
    fontSize: 16,
    color: '#272f31',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#272f31',
  },
});

export default RestaurantListScreen;
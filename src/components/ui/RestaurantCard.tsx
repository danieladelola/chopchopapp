import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/AppStyles';

interface RestaurantItem {
  id: string | number;
  name: string;
  cover_photo_full_url: string;
  avg_rating?: number;
}

interface RestaurantCardProps {
  item: RestaurantItem;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.restaurantItem}>
      <View style={styles.restaurantImageContainer}>
        {item.cover_photo_full_url && (
          <Image
            source={{ uri: item.cover_photo_full_url }}
            style={styles.restaurantImage}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantRating}>Rating: {item.avg_rating?.toFixed(1) || 'N/A'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantItem: {
    alignItems: 'center',
    marginRight: Spacing.medium,
    width: 200,
  },
  restaurantImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: Spacing.small,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  restaurantName: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  restaurantRating: {
    fontSize: Typography.fontSize.small,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});

export default RestaurantCard;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useCart } from '../context/CartContext';
import { LocationContext } from '../context/LocationContext';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';
import { getNotifications } from '../services/notifications';
import { getCategories } from '../services/categories';
import { getAddressFromCoordinates } from '../services/location';

import { getLatestProducts, getPopularProducts } from '../services/products';
import { getRestaurants } from '../services/restaurants';
import { getBanners } from '../services/banners';
import SectionHeader from '../components/ui/SectionHeader';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';
import RestaurantCard from '../components/ui/RestaurantCard';
import BadgeIcon from '../components/ui/BadgeIcon';

import { ActivityIndicator } from 'react-native'; // Add ActivityIndicator import
import useHomeData from '../hooks/useHomeData'; // Import the custom hook

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart } = useCart();

  const {
    address,
    notificationCount,
    categories,
    loadingCategories,
    latestProducts,
    loadingLatestProducts,
    popularProducts,
    loadingPopularProducts,
    restaurants,
    loadingRestaurants,
    banner,
    loadingBanner,
    error,
  } = useHomeData(route.params);

  

  

  

  

  return (
    <View style={styles.fullContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.locationContainer} onPress={() => navigation.navigate('MapScreen')}>
            <MaterialIcons name="location-on" size={24} color={Colors.darkGreen} />
            <Text style={styles.locationText}>{address}</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <BadgeIcon
              iconName="shopping-basket"
              size={28}
              color={Colors.darkGreen}
              badgeCount={cart.length > 0 ? cart.length : undefined}
              onPress={() => navigation.navigate('CartScreen')}
            />
            <BadgeIcon
              iconName="notifications"
              size={28}
              color={Colors.darkGreen}
              badgeCount={notificationCount > 0 ? notificationCount : undefined}
              onPress={() => navigation.navigate('Notifications')}
            />
          </View>
        </View>

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          {loadingBanner ? (
            <ActivityIndicator size="large" color={Colors.darkGreen} />
          ) : banner ? (
            <Image
              source={{ uri: banner.image_full_url }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ) : null}
          {error && <Text style={{ color: Colors.red, textAlign: 'center' }}>{error}</Text>}
        </View>

        {/* Categories Section */}
        <SectionHeader
          title="Categories"
          onPressViewAll={() => navigation.navigate('CategoryListScreen')}
        />
        <View style={styles.categoriesSection}>
          {loadingCategories ? (
            <ActivityIndicator size="large" color={Colors.darkGreen} />
          ) : (
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <CategoryCard
                  item={item}
                  onPress={(categoryId, categoryName) =>
                    navigation.navigate('CategoryDetailScreen', { categoryId, categoryName })
                  }
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryListContainer}
            />
          )}
        </View>

        {/* Popular Food Nearby Section */}
        <SectionHeader title="Popular Food Nearby" />
        <View style={styles.productsSection}>
          {loadingPopularProducts ? (
            <ActivityIndicator size="large" color={Colors.darkGreen} />
          ) : (
            <FlatList
              data={popularProducts}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productListContainer}
            />
          )}
        </View>

        {/* Restaurants Section */}
        <SectionHeader title="Restaurants" />
        <View style={styles.restaurantsSection}>
          {loadingRestaurants ? (
            <ActivityIndicator size="large" color={Colors.darkGreen} />
          ) : (
            <FlatList
              data={restaurants}
              renderItem={({ item }) => <RestaurantCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.restaurantListContainer}
            />
          )}
        </View>

        {/* Latest Products Section (moved to bottom or removed if not needed) */}
        <SectionHeader title="Latest Products" />
        <View style={styles.productsSection}>
          {loadingLatestProducts ? (
            <ActivityIndicator size="large" color={Colors.darkGreen} />
          ) : (
            <FlatList
              data={latestProducts}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productListContainer}
            />
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <Text style={{ color: Colors.darkGreen }}>Bottom Navigation Here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: Spacing.small,
    backgroundColor: Colors.white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginLeft: Spacing.tiny,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  bottomNav: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  categoriesSection: {
    marginTop: Spacing.medium,
    paddingLeft: Spacing.medium,
  },
  productsSection: {
    marginTop: Spacing.medium,
    paddingLeft: Spacing.medium,
  },
  restaurantsSection: {
    marginTop: Spacing.medium,
    paddingLeft: Spacing.medium,
  },
  categoryListContainer: {
    paddingRight: Spacing.medium,
  },
  productListContainer: {
    paddingRight: Spacing.medium,
  },
  restaurantListContainer: {
    paddingRight: Spacing.medium,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    marginBottom: Spacing.medium,
    overflow: 'hidden',
    borderRadius: BorderRadius.medium,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;

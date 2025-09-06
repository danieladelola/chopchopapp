import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getChildCategories, getCategoryProducts, getCategoryRestaurants } from '../services/categories'; // Corrected import
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';

interface Category {
  id: string;
  name: string;
  // Add other category properties as needed
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_full_url: string;
  // Add other product properties
}

interface Restaurant {
  id: string;
  name: string;
  // Add other restaurant properties
}

const CategoryDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { categoryId, categoryName } = route.params;
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryRestaurants, setCategoryRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName || 'Category Details', // Set the title dynamically
    });
  }, [navigation, categoryName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch child categories
        const childDataResponse = await getChildCategories(categoryId);
        if (childDataResponse.data && Array.isArray(childDataResponse.data)) {
          setChildCategories(childDataResponse.data);
        }

        // Fetch products for this category
        const productDataResponse = await getCategoryProducts(categoryId);
        if (productDataResponse.data && Array.isArray(productDataResponse.data.products)) {
          setCategoryProducts(productDataResponse.data.products);
        }

        // Fetch restaurants for this category
        const restaurantDataResponse = await getCategoryRestaurants(categoryId);
        if (restaurantDataResponse.data && Array.isArray(restaurantDataResponse.data)) {
          setCategoryRestaurants(restaurantDataResponse.data);
        }

      } catch (error) {
        console.error(`Error fetching details for category ${categoryId}:`, error);
        Alert.alert('Error', 'Failed to fetch category details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem}>
      <View style={styles.productImageContainer}>
        {item.image_full_url && (
          <Image
            source={{ uri: item.image_full_url }}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.darkGreen} />
        <Text>Loading {categoryName} details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {childCategories.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Subcategories</Text>
          <FlatList
            data={childCategories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemCard}
                onPress={() => navigation.push('CategoryDetailScreen', { categoryId: item.id, categoryName: item.name })}
              >
                <Text style={styles.itemCardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {categoryProducts.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Products in {categoryName}</Text>
          <FlatList
            data={categoryProducts}
            keyExtractor={(item) => item.id}
            numColumns={2} // Display in 2 columns
            columnWrapperStyle={styles.row}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productListContainer}
          />
        </View>
      ) : (
        !loading && <Text style={styles.emptyText}>No products found in this category.</Text>
      )}

      {categoryRestaurants.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Restaurants in {categoryName}</Text>
          <FlatList
            data={categoryRestaurants}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemCard}
                onPress={() => Alert.alert('Restaurant Details', `Navigate to details for ${item.name}`)} // Placeholder for restaurant details navigation
              >
                <Text style={styles.itemCardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {!loading && childCategories.length === 0 && categoryProducts.length === 0 && categoryRestaurants.length === 0 && (
        <Text style={styles.emptyText}>No details available for this category.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.xLarge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginBottom: Spacing.medium,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginTop: Spacing.large,
    marginBottom: Spacing.medium,
  },
  itemCard: {
    backgroundColor: Colors.lightGray,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    marginRight: Spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    height: 70,
  },
  itemCardText: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.large,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  productListContainer: {
    paddingBottom: Spacing.large,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.tiny,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    maxWidth: '48%', // Adjust for 2 columns with spacing
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
    marginBottom: Spacing.small,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: Spacing.tiny,
  },
  productPrice: {
    fontSize: Typography.fontSize.medium,
    color: Colors.orange,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default CategoryDetailScreen;
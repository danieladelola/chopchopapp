import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { getCategories } from '../services/api';
import { Colors } from '../constants/AppStyles';

interface Category {
  id: number;
  name: string;
  image_full_url: string; // Changed to image_full_url
}

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await getCategories();
        if (response && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={Colors.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.darkGray}
        />
      </View>

      {loadingCategories ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.darkGreen} />
          <Text>Loading categories...</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display in 2 columns
          columnWrapperStyle={styles.row} // Style for rows
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('CategoryDetailScreen', { categoryId: item.id, categoryName: item.name })}
            >
              <Image source={{ uri: item.image_full_url }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20, // Keep padding top for overall screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Take up remaining space
    height: 50,
    fontSize: 16,
    color: Colors.darkGray,
  },
  categoryListContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    aspectRatio: 1, // Make it square
    justifyContent: 'center',
  },
  categoryImage: {
    width: 80, // Fixed width
    height: 80, // Fixed height
    borderRadius: 40, // Half of width/height to make it circular
    resizeMode: 'cover', // Use 'cover' to fill the circle
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.darkGray,
  },
});

export default SearchScreen;

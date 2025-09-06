import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/AppStyles';

interface CategoryItem {
  id: string | number;
  name: string;
  image_full_url: string;
}

interface CategoryCardProps {
  item: CategoryItem;
  onPress: (categoryId: string | number, categoryName: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onPress(item.id, item.name)}>
      <View style={styles.imageContainer}>
        {item.image_full_url && (
          <Image
            source={{ uri: item.image_full_url }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginRight: Spacing.medium,
    width: 80,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: Typography.fontSize.small,
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CategoryCard;

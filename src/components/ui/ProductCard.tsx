import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/AppStyles';

interface ProductItem {
  id: string | number;
  name: string;
  image_full_url: string;
  price: number;
}

interface ProductCardProps {
  item: ProductItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
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
};

const styles = StyleSheet.create({
  productItem: {
    alignItems: 'center',
    marginRight: Spacing.medium,
    width: 150,
  },
  productImageContainer: {
    width: 140,
    height: 140,
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
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: Typography.fontSize.medium,
    color: Colors.orange,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductCard;

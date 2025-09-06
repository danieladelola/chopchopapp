import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getCouponList } from '../services/api';

interface Coupon {
  id: string;
  code: string;
  description: string;
  // Add other coupon properties as needed
}

const CouponScreen = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        // Assuming getCouponList fetches data from /api/v1/coupon/list
        const data = await getCouponList();
        setCoupons(data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        Alert.alert('Error', 'Failed to fetch coupons.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#074425" />
        <Text>Loading coupons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Coupons</Text>
      <FlatList
        data={coupons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.couponItem}>
            <Text style={styles.couponCode}>{item.code}</Text>
            <Text style={styles.couponDescription}>{item.description}</Text>
            {/* You can add more coupon details here */}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No coupons available.</Text>}
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
  couponItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  couponCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef5123',
    marginBottom: 5,
  },
  couponDescription: {
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

export default CouponScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getOrderList } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  // Add other order properties as needed
  status: string;
  total: number;
}

const OrdersScreen = ({ navigation }) => {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        try {
          const data = await getOrderList();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          Alert.alert('Error', 'Failed to fetch orders.');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#074425" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.guestContainer}>
        <Text style={styles.guestTitle}>View Your Orders</Text>
        <Text style={styles.guestSubtitle}>Log in or create an account to see your order history.</Text>
        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
          <Text style={styles.guestButtonText}>Login / Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guestButton} onPress={() => Alert.alert('Guest Order', 'Functionality to order as guest will be implemented here.')}>
          <Text style={styles.guestButtonText}>Order as Guest</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Total: ${item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
  orderItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#272f31',
    textAlign: 'center',
    marginBottom: 30,
  },
  guestButton: {
    backgroundColor: '#ef5123',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
  },
  guestButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;

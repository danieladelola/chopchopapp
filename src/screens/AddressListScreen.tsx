import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAddresses, deleteAddress, Address } from '../services/address';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';

const AddressListScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAddresses();
      if (response.data && Array.isArray(response.data)) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      Alert.alert('Error', 'Failed to load addresses.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [fetchAddresses])
  );

  const handleDeleteAddress = async (addressId: number) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteAddress(addressId);
              Alert.alert('Success', 'Address deleted successfully.');
              fetchAddresses(); // Refresh the list
            } catch (error) {
              console.error('Failed to delete address:', error);
              Alert.alert('Error', 'Failed to delete address.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressInfo}>
        <Text style={styles.addressType}>{item.address_type}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
        <Text style={styles.contactPerson}>{item.contact_person_name} - {item.contact_person_number}</Text>
      </View>
      <View style={styles.addressActions}>
        <TouchableOpacity onPress={() => navigation.navigate('AddEditAddressScreen', { address: item })}>
          <MaterialIcons name="edit" size={24} color={Colors.darkGreen} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => item.id && handleDeleteAddress(item.id)}>
          <MaterialIcons name="delete" size={24} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.darkGreen} />
        <Text>Loading addresses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderAddressItem}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No addresses found. Add a new one!</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditAddressScreen')}
      >
        <MaterialIcons name="add" size={24} color={Colors.white} />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.small,
  },
  addressInfo: {
    flex: 1,
  },
  addressType: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginBottom: Spacing.tiny,
  },
  addressText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  contactPerson: {
    fontSize: Typography.fontSize.small,
    color: Colors.mediumGray,
    marginTop: Spacing.tiny,
  },
  addressActions: {
    flexDirection: 'row',
    gap: Spacing.medium,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.orange,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.medium,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.small,
  },
});

export default AddressListScreen;

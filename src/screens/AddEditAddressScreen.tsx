import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';
import { addAddress, updateAddress, Address } from '../services/address';
import { getAddressFromCoordinates, geocodeAddress } from '../services/location';
import { LocationContext } from '../context/LocationContext';
import MapWrapper from '../components/MapWrapper';

const AddEditAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const locationContext = useContext(LocationContext);
  const editingAddress = route.params?.address as Address | undefined;

  const [address, setAddress] = useState(editingAddress?.address || '');
  const [latitude, setLatitude] = useState<number>(editingAddress?.latitude || locationContext?.location?.latitude || 0);
  const [longitude, setLongitude] = useState<number>(editingAddress?.longitude || locationContext?.location?.longitude || 0);
  const [addressType, setAddressType] = useState(editingAddress?.address_type || 'Home');
  const [contactPersonName, setContactPersonName] = useState(editingAddress?.contact_person_name || '');
  const [contactPersonNumber, setContactPersonNumber] = useState(editingAddress?.contact_person_number || '');
  const [road, setRoad] = useState(editingAddress?.road || '');
  const [house, setHouse] = useState(editingAddress?.house || '');
  const [floor, setFloor] = useState(editingAddress?.floor || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAddress) {
      navigation.setOptions({ title: 'Edit Address' });
    } else {
      navigation.setOptions({ title: 'Add New Address' });
    }
  }, [editingAddress, navigation]);

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    const newAddress = await getAddressFromCoordinates(latitude, longitude);
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  const handleGeocodeAddress = async () => {
    if (!address) {
      Alert.alert('Input Required', 'Please enter an address to geocode.');
      return;
    }
    setLoading(true);
    try {
      const geocoded = await geocodeAddress(address);
      if (geocoded) {
        setLatitude(geocoded.latitude);
        setLongitude(geocoded.longitude);
        setAddress(geocoded.formattedAddress || address); // Use formatted address if available
      } else {
        Alert.alert('Geocoding Failed', 'Could not find coordinates for the entered address.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      Alert.alert('Error', 'Failed to geocode address.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!address || !contactPersonName || !contactPersonNumber || latitude === 0 || longitude === 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields and select a location on the map.');
      return;
    }

    setLoading(true);
    const addressData: Omit<Address, 'id'> = {
      address,
      latitude,
      longitude,
      address_type: addressType,
      contact_person_name: contactPersonName,
      contact_person_number: contactPersonNumber,
      road,
      house,
      floor,
    };

    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id!, addressData);
        Alert.alert('Success', 'Address updated successfully!');
      } else {
        await addAddress(addressData);
        Alert.alert('Success', 'Address added successfully!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Address</Text>
      <View style={styles.addressInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter full address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="words"
        />
        <TouchableOpacity onPress={handleGeocodeAddress} style={styles.geocodeButton}>
          <MaterialIcons name="search" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Location on Map</Text>
      <View style={styles.mapContainer}>
        <MapWrapper
          initialRegion={{
            latitude: latitude || 37.78825,
            longitude: longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
          latitude={latitude}
          longitude={longitude}
          style={styles.map}
        />
      </View>

      <Text style={styles.label}>Address Type</Text>
      <View style={styles.addressTypeContainer}>
        <TouchableOpacity
          style={[styles.addressTypeButton, addressType === 'Home' && styles.selectedAddressType]}
          onPress={() => setAddressType('Home')}
        >
          <Text style={[styles.addressTypeButtonText, addressType === 'Home' && styles.selectedAddressTypeText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addressTypeButton, addressType === 'Work' && styles.selectedAddressType]}
          onPress={() => setAddressType('Work')}
        >
          <Text style={[styles.addressTypeButtonText, addressType === 'Work' && styles.selectedAddressTypeText]}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addressTypeButton, addressType === 'Other' && styles.selectedAddressType]}
          onPress={() => setAddressType('Other')}
        >
          <Text style={[styles.addressTypeButtonText, addressType === 'Other' && styles.selectedAddressTypeText]}>Other</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Contact Person Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact person name"
        value={contactPersonName}
        onChangeText={setContactPersonName}
      />

      <Text style={styles.label}>Contact Person Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact person number"
        value={contactPersonNumber}
        onChangeText={setContactPersonNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Road (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter road name"
        value={road}
        onChangeText={setRoad}
      />

      <Text style={styles.label}>House (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter house number/name"
        value={house}
        onChangeText={setHouse}
      />

      <Text style={styles.label}>Floor (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter floor number"
        value={floor}
        onChangeText={setFloor}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveAddress}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Address'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  label: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginTop: Spacing.medium,
    marginBottom: Spacing.tiny,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    padding: Spacing.small,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.small,
  },
  geocodeButton: {
    backgroundColor: Colors.darkGreen,
    padding: Spacing.small,
    borderRadius: BorderRadius.small,
    marginLeft: Spacing.small,
  },
  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
    marginBottom: Spacing.medium,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.medium,
  },
  addressTypeButton: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  selectedAddressType: {
    backgroundColor: Colors.darkGreen,
    borderColor: Colors.darkGreen,
  },
  addressTypeButtonText: {
    color: Colors.darkGray,
    fontSize: Typography.fontSize.medium,
  },
  selectedAddressTypeText: {
    color: Colors.white,
  },
  saveButton: {
    backgroundColor: Colors.orange,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginTop: Spacing.large,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
  },
  webMapPlaceholderText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
  },
});

export default AddEditAddressScreen;

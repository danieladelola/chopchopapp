
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/AppStyles';
import { geocodeAddress, setZoneInStorage } from '../services/location';
import { LocationContext } from '../context/LocationContext';
import apiClient from '../services/apiClient';
import { API_ENDPOINTS } from '../services/apiConfig';

const SetLocationManuallyScreen = () => {
  const navigation = useNavigation();
  const locationContext = useContext(LocationContext);
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetLocation = async () => {
    if (!addressInput) {
      Alert.alert('Input Required', 'Please enter an address.');
      return;
    }

    setLoading(true);
    try {
      const geocodedLocation = await geocodeAddress(addressInput);

      if (geocodedLocation) {
        locationContext?.setLocation({
          latitude: geocodedLocation.latitude,
          longitude: geocodedLocation.longitude,
        });

        // Get zone ID based on geocoded coordinates
        const zoneResponse = await apiClient.get(API_ENDPOINTS.zone.getZoneId, {
          params: {
            lat: geocodedLocation.latitude,
            lng: geocodedLocation.longitude,
          },
        });

        if (zoneResponse.data && zoneResponse.data.zone_id) {
          const zoneId = [zoneResponse.data.zone_id]; // Assuming zoneId needs to be an array
          await setZoneInStorage(zoneId);
          // @ts-ignore
          navigation.navigate('App'); // Navigate to the main app
        } else {
          Alert.alert('Location Error', 'Could not determine zone for the entered address.');
        }
      } else {
        Alert.alert('Location Not Found', 'Could not find coordinates for the entered address. Please try a different address.');
      }
    } catch (error) {
      console.error('Error setting manual location:', error);
      Alert.alert('Error', 'Failed to set location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Location Manually</Text>
      <Text style={styles.subtitle}>Please enter your full address to find nearby services.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter full address"
        value={addressInput}
        onChangeText={setAddressInput}
        autoCapitalize="words"
        returnKeyType="done"
        onSubmitEditing={handleSetLocation}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSetLocation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Setting Location...' : 'Set Location'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.medium,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
  },
  subtitle: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: Spacing.large,
  },
  input: {
    width: '100%',
    padding: Spacing.medium,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.large,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default SetLocationManuallyScreen;

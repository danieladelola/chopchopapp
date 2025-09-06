
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../context/LocationContext';
import { getUserLocation, setZoneInStorage } from '../services/location';
import { Colors } from '../constants/AppStyles';
import apiClient from '../services/apiClient';
import { API_ENDPOINTS } from '../services/apiConfig';

const LocationSetupScreen = () => {
  const navigation = useNavigation();
  const locationContext = useContext(LocationContext);

  const handleUseCurrentLocation = async () => {
    try {
      const coords = await getUserLocation();
      locationContext?.setLocation(coords);

      // Now, get the zone ID based on the coordinates
      const zoneResponse = await apiClient.get(API_ENDPOINTS.zone.getZoneId, {
        params: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      });

      console.log('Zone Response Data:', zoneResponse.data);

      if (zoneResponse.data && zoneResponse.data.zone_id) {
        console.log('Zone ID from API:', zoneResponse.data.zone_id);
        const zoneId = zoneResponse.data.zone_id;
        await setZoneInStorage(zoneId);
        // @ts-ignore
        navigation.navigate('App'); // Navigate to the main app
      } else {
        Alert.alert('Location Error', 'Could not determine zone for your location.');
      }
    } catch (error) {
      console.error('Failed to get location or zone:', error);
      Alert.alert('Location Error', 'Failed to get your current location. Please try again.');
    }
  };

  const handleSetLocationManually = () => {
    // @ts-ignore
    navigation.navigate('SetLocationManually'); // Navigate to the manual location selection screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Set Your Location</Text>
      <Text style={styles.subtitle}>To find the best restaurants near you, we need your location.</Text>

      <TouchableOpacity style={styles.button} onPress={handleUseCurrentLocation}>
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.manualButton]} onPress={handleSetLocationManually}>
        <Text style={[styles.buttonText, styles.manualButtonText]}>Set Location Manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  manualButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  manualButtonText: {
    color: Colors.orange,
  },
});

export default LocationSetupScreen;

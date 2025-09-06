import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import MapWrapper from '../components/MapWrapper'; // Import MapWrapper
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';
import { LocationContext } from '../context/LocationContext';
import { getAddressFromCoordinates } from '../services/location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const locationContext = useContext(LocationContext);
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: locationContext?.location?.latitude || 37.78825, // Default to San Francisco if no location
    longitude: locationContext?.location?.longitude || -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set initial marker to current location context
    if (locationContext?.location) {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: locationContext.location.latitude,
        longitude: locationContext.location.longitude,
      }));
      setMarkerCoordinate({
        latitude: locationContext.location.latitude,
        longitude: locationContext.location.longitude,
      });
    }
  }, [locationContext?.location]);

  const handleRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
    setMarkerCoordinate({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  const handlePickLocation = async () => {
    try {
      const address = await getAddressFromCoordinates(markerCoordinate.latitude, markerCoordinate.longitude);
      Alert.alert(
        'Confirm Location',
        `Do you want to pick this location?
${address || 'Unknown Address'}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              // Pass the selected coordinates back to the previous screen (HomeScreen)
              navigation.navigate('HomeScreen', {
                selectedLocation: {
                  latitude: markerCoordinate.latitude,
                  longitude: markerCoordinate.longitude,
                  address: address,
                },
              });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error getting address:', error);
      Alert.alert('Error', 'Could not get address for the selected location.');
    }
  };

  const handleSearch = () => {
    // TODO: Implement actual search using Google Places API
    Alert.alert('Search', `Searching for: ${searchQuery}`);
    // For now, just log the search query
    console.log('Search query:', searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for address or place"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <MaterialIcons name="search" size={24} color={Colors.darkGray} />
        </TouchableOpacity>
      </View>

      <MapWrapper
        initialRegion={region}
        onPress={handleRegionChangeComplete}
        latitude={markerCoordinate.latitude}
        longitude={markerCoordinate.longitude}
        style={styles.map}
      />

      <TouchableOpacity style={styles.pickLocationButton} onPress={handlePickLocation}>
        <Text style={styles.pickLocationButtonText}>Pick This Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.medium,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  searchIcon: {
    marginLeft: Spacing.small,
    padding: Spacing.tiny,
  },
  map: {
    flex: 1,
  },
  pickLocationButton: {
    backgroundColor: Colors.darkGreen,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    margin: Spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pickLocationButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default MapScreen;

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

interface LocationContextType {
  location: any; // Replace 'any' with a more specific type for your location data
  setLocation: (location: any) => void;
  isLoadingLocation: boolean; // Add isLoadingLocation
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<any>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true); // New loading state

  // Function to save location to AsyncStorage
  const saveLocation = async (newLocation: any) => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify(newLocation));
      setLocationState(newLocation);
    } catch (e) {
      console.error('Failed to save location to storage', e);
    }
  };

  // Function to load location from AsyncStorage on mount
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('userLocation');
        if (storedLocation) {
          setLocationState(JSON.parse(storedLocation));
        }
      } catch (e) {
        console.error('Failed to load location from storage', e);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    loadLocation();
  }, []);

  // Override setLocation to also save to AsyncStorage
  const setLocation = (newLocation: any) => {
    saveLocation(newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, isLoadingLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
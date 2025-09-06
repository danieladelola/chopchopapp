import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface MapWrapperProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onPress: (event: any) => void;
  latitude: number;
  longitude: number;
  style?: any;
}

const MapWrapperNative: React.FC<MapWrapperProps> = ({ initialRegion, onPress, latitude, longitude, style }) => {
  return (
    <MapView
      style={[styles.map, style]}
      initialRegion={initialRegion}
      onPress={onPress}
    >
      {latitude !== 0 && longitude !== 0 && (
        <Marker coordinate={{ latitude, longitude }} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapWrapperNative;

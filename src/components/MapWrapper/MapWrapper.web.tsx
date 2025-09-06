import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

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

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapWrapperWeb: React.FC<MapWrapperProps> = ({ initialRegion, onPress, latitude, longitude, style }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDOnFVE45ToO7XRkZ1mYcY9tgK07I77P0k', // Use the provided API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: initialRegion.latitude - initialRegion.latitudeDelta / 2,
      lng: initialRegion.longitude - initialRegion.longitudeDelta / 2,
    }, {
      lat: initialRegion.latitude + initialRegion.latitudeDelta / 2,
      lng: initialRegion.longitude + initialRegion.longitudeDelta / 2,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, [initialRegion]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (onPress && event.latLng) {
      onPress({ nativeEvent: { coordinate: { latitude: event.latLng.lat(), longitude: event.latLng.lng() } } });
    }
  }, [onPress]);

  const center = { lat: initialRegion.latitude, lng: initialRegion.longitude };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, ...style }}
      center={center}
      zoom={13} // A reasonable default zoom level
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {latitude !== 0 && longitude !== 0 && (
        <Marker position={{ lat: latitude, lng: longitude }} />
      )}
    </GoogleMap>
  ) : <></>;
};

export default MapWrapperWeb;

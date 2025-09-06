import React from 'react';

// Mock MapView component
const MapView = (props) => {
  console.warn('MapView is not supported on web. Using a placeholder.');
  return <div style={{ width: '100%', height: props.style?.height || 200, backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <p>Map Placeholder (Web)</p>
  </div>;
};

// Mock Marker component
const Marker = (props) => {
  console.warn('Marker is not supported on web. Using a placeholder.');
  return null; // Markers won't be visible on the placeholder map
};

// Mock other common exports if needed
const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = 'default';

export default MapView;
export { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT };
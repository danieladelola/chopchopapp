
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationSetupScreen from '../screens/LocationSetupScreen';
import SetLocationManuallyScreen from '../screens/SetLocationManuallyScreen';

const Stack = createStackNavigator();

const LocationNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationSetup" component={LocationSetupScreen} />
      <Stack.Screen name="SetLocationManually" component={SetLocationManuallyScreen} />
    </Stack.Navigator>
  );
};

export default LocationNavigator;

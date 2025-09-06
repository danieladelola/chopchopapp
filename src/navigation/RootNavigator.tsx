import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import LocationNavigator from './LocationNavigator';
import { useAuth } from '../context/AuthContext';
import { LocationContext } from '../context/LocationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn, isGuest, isLoading } = useAuth();
  const locationContext = useContext(LocationContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isLoading || isFirstLaunch === null) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingNavigator
              {...props}
              onComplete={() => setIsFirstLaunch(false)}
            />
          )}
        </Stack.Screen>
      ) : !isLoggedIn && !isGuest ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !locationContext?.location ? (
        <Stack.Screen name="Location" component={LocationNavigator} />
      ) : (
        <Stack.Screen name="App" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
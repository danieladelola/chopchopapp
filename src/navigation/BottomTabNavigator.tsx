import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import OrdersScreen from '../screens/OrdersScreen';
import SupportScreen from '../screens/SupportScreen';
// import WishlistScreen from '../screens/WishlistScreen';

import ProfileStackScreen from './ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Orders') {
            iconName = 'receipt';
          } else if (route.name === 'Support') {
            iconName = 'support-agent';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ef5123', // Orange
        tabBarInactiveTintColor: '#272f31', // Dark Gray
        headerShown: false, // Hide header for all screens in the tab navigator
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

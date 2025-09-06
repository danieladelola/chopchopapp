import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import ReviewSubmissionScreen from '../screens/ReviewSubmissionScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import MapScreen from '../screens/MapScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen 
        name="CategoryDetailScreen" 
        component={CategoryDetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.categoryName || 'Category Details', // Fallback title
        })} 
      />
      <Stack.Screen name="ReviewSubmission" component={ReviewSubmissionScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Select Location' }} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
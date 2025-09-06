import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;

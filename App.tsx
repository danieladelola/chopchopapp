import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
// import { WishlistProvider } from './src/context/WishlistContext';
import { LocationProvider } from './src/context/LocationContext';

const App = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
        <AuthProvider>
          {/* <WishlistProvider> */}
            <CartProvider>
              <RootNavigator />
            </CartProvider>
          {/* </WishlistProvider> */}
        </AuthProvider>
      </LocationProvider>
    </NavigationContainer>
  );
};

export default App;
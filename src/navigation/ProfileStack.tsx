import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import WalletScreen from '../screens/WalletScreen';
import LoyaltyPointsScreen from '../screens/LoyaltyPointsScreen';
import LegalScreen from '../screens/LegalScreen';
import FAQScreen from '../screens/FAQScreen';
import HowToScreen from '../screens/HowToScreen';
import AddressListScreen from '../screens/AddressListScreen';
import AddEditAddressScreen from '../screens/AddEditAddressScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="WalletScreen" component={WalletScreen} />
      <ProfileStack.Screen name="LoyaltyPointsScreen" component={LoyaltyPointsScreen} />
      <ProfileStack.Screen name="LegalScreen" component={LegalScreen} options={{ title: 'Legal Terms' }} />
      <ProfileStack.Screen name="FAQScreen" component={FAQScreen} options={{ title: 'FAQs' }} />
      <ProfileStack.Screen name="HowToScreen" component={HowToScreen} options={{ title: 'How-To Guide' }} />
      <ProfileStack.Screen name="AddressListScreen" component={AddressListScreen} options={{ title: 'My Addresses' }} />
      <ProfileStack.Screen name="AddEditAddressScreen" component={AddEditAddressScreen} options={{ title: 'Address Details' }} />
      <ProfileStack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} options={{ title: 'Profile Details' }} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
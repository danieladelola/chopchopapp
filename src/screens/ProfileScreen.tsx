import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getWishlist, getCustomerInfo, removeCustomerAccount } from '../services/api';
import { getAddresses } from '../services/address'; // Import getAddresses
import { useAuth } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface CustomerInfo {
  f_name: string;
  l_name: string;
  email: string;
  phone_number: string;
  // Add other customer info properties as needed
}

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  badgeCount?: number;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, onPress, badgeCount }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <MaterialIcons name={icon} size={24} color={'#272f31'} />
      <Text style={styles.menuItemTitle}>{title}</Text>
    </View>
    {badgeCount !== undefined && badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
    <MaterialIcons name="chevron-right" size={24} color="#999" />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { isLoggedIn, logout } = useAuth();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressCount, setAddressCount] = useState(0); // State for address count
  

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (isLoggedIn) {
          try {
            const [wishlistData, customerData, addressesData] = await Promise.all([
              getWishlist(),
              getCustomerInfo(),
              getAddresses(), // Fetch addresses
            ]);
            console.log('isLoggedIn:', isLoggedIn);
            console.log('Customer Data fetched:', customerData);
            // setWishlist(wishlistData); // Assuming wishlist is not used in this screen
            setCustomerInfo(customerData);
            setAddressCount(addressesData.data.length); // Set actual address count

          } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch profile data.');
          } finally {
            setLoading(false);
          }
        } else {
          console.log('User not logged in, skipping data fetch.');
          setLoading(false);
        }
      };

      fetchData();
    }, [isLoggedIn])
  );

  

  const handleRemoveAccount = async () => {
    try {
      await removeCustomerAccount();
      Alert.alert('Success', 'Account removed.');
      logout(); // Log out after account removal
    } catch (error) {
      console.error('Error removing account:', error);
      Alert.alert('Error', 'Failed to remove account.');
    }
  };

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#074425" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.guestContainer}>
        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
          <Text style={styles.guestButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('../assets/images/logo.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>{customerInfo?.f_name} {customerInfo?.l_name || 'User'}</Text>
        <Text style={styles.profileEmail}>{customerInfo?.email || 'user@example.com'}</Text>
      </View>

      

      <Text style={styles.sectionTitle}>Personal</Text>
      <View style={styles.sectionContent}>
        <ProfileMenuItem
          icon="person-outline"
          title="Profile Details"
          onPress={() => navigation.navigate('ProfileDetailsScreen')}
        />
        <ProfileMenuItem
          icon="location-on"
          title="Addresses"
          onPress={() => navigation.navigate('AddressListScreen')}
          badgeCount={addressCount}
        />
      </View>

      <Text style={styles.sectionTitle}>Wallet</Text>
      <View style={styles.sectionContent}>
        <ProfileMenuItem
          icon="account-balance-wallet"
          title="Wallet"
          onPress={() => navigation.navigate('WalletScreen')}
        />
        <ProfileMenuItem
          icon="star-outline"
          title="Loyalty Points"
          onPress={() => navigation.navigate('LoyaltyPointsScreen')}
        />
      </View>

      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.sectionContent}>
        <ProfileMenuItem
          icon="card-giftcard"
          title="Referrals"
          onPress={() => Alert.alert('Referrals', 'Refer a friend.')}
        />
        <ProfileMenuItem
          icon="redeem"
          title="Gift Cards"
          onPress={() => Alert.alert('Gift Cards', 'Manage your gift cards.')}
        />
      </View>

      <Text style={styles.sectionTitle}>More</Text>
      <View style={styles.sectionContent}>
        <ProfileMenuItem
          icon="help-outline"
          title="How-Tos"
          onPress={() => navigation.navigate('HowToScreen')}
        />
        <ProfileMenuItem
          icon="question-answer"
          title="FAQs"
          onPress={() => navigation.navigate('FAQScreen')}
        />
        <ProfileMenuItem
          icon="support-agent"
          title="Get Help"
          onPress={() => navigation.navigate('Support')}
        />
        <ProfileMenuItem
          icon="gavel"
          title="Legal"
          onPress={() => navigation.navigate('LegalScreen')}
        />
        <ProfileMenuItem
          icon="favorite-outline"
          title="My Wishlist"
          onPress={() => navigation.navigate('WishlistScreen')}
        />
        <ProfileMenuItem
          icon="logout"
          title="Logout"
          onPress={logout}
        />
        <ProfileMenuItem
          icon="delete"
          title="Remove Account"
          onPress={handleRemoveAccount}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#272f31',
    textAlign: 'center',
    marginBottom: 30,
  },
  guestButton: {
    backgroundColor: '#ef5123',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
  },
  guestButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#074425',
  },
  profileEmail: {
    fontSize: 16,
    color: '#272f31',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#074425',
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  inputGroup: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#272f31',
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: '#074425',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 15,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  actionButton: {
    backgroundColor: '#fbb216',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  removeAccountButton: {
    backgroundColor: '#ef5123',
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addressText: {
    fontSize: 16,
    flex: 1,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionText: {
    color: '#ef5123',
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#272f31',
    marginLeft: 10,
  },
  badge: {
    backgroundColor: '#ef5123',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chowpassCard: {
    backgroundColor: '#8a2be2', // Purple color for Chowpass
    marginBottom: 20,
    paddingVertical: 20,
  },
  chowpassTitle: {
    color: '#ffffff',
  },
  chowpassSubText: {
    color: '#ffffff',
    fontSize: 14,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
});

export default ProfileScreen;
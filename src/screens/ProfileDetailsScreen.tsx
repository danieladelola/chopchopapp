import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCustomerInfo, updateCustomerProfile } from '../services/api';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/AppStyles';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await getCustomerInfo();
        
        setName(info.f_name + ' ' + info.l_name); // Assuming f_name and l_name
        setEmail(info.email);
        setPhoneNumber(info.phone_number || '');
      } catch (error) {
        console.error('Failed to fetch customer info:', error);
        if (error.response && error.response.status === 401) {
          Alert.alert('Session Expired', 'Your session has expired. Please log in again.', [
            { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
          ]);
        } else {
          Alert.alert('Error', 'Failed to load profile details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [navigation]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Assuming your API expects f_name and l_name separately
      const [f_name, ...l_nameParts] = name.split(' ');
      const l_name = l_nameParts.join(' ');

      await updateCustomerProfile({
        f_name: f_name || '',
        l_name: l_name || '',
        email: email,
        phone_number: phoneNumber,
      });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.darkGreen} />
        <Text>Loading profile details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveProfile}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginTop: Spacing.medium,
    marginBottom: Spacing.tiny,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    padding: Spacing.small,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
  },
  saveButton: {
    backgroundColor: Colors.orange,
    padding: Spacing.medium,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginTop: Spacing.large,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default ProfileDetailsScreen;

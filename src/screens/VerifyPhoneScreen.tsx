import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { verifyPhone } from '../services/auth'; // Remove this import
import { useAuth } from '../context/AuthContext'; // Import useAuth

const VerifyPhoneScreen = ({ route }) => {
  const { verifyPhone } = useAuth(); // Destructure verifyPhone from useAuth()
  const { phone } = route.params; // Assuming phone is passed as a route parameter
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyPhone = async () => {
    setLoading(true);
    try {
      const response = await verifyPhone({ phone, code }); // Use verifyPhone from useAuth()
      console.log('Phone verification successful:', response);
      Alert.alert('Success', 'Phone verified successfully.');
      // Navigate to the next screen
    } catch (error) {
      console.error('Phone verification failed:', error);
      Alert.alert('Error', 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone</Text>
      <Text style={styles.subtitle}>Enter the code sent to your phone to continue.</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyPhone} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#074425',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#272f31',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ef5123',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyPhoneScreen;
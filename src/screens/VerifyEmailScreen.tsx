import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { verifyEmail } from '../services/auth'; // Remove this import
import { useAuth } from '../context/AuthContext'; // Import useAuth

const VerifyEmailScreen = ({ route }) => {
  const { verifyEmail } = useAuth(); // Destructure verifyEmail from useAuth()
  const { email } = route.params; // Assuming email is passed as a route parameter
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const response = await verifyEmail({ email, code }); // Use verifyEmail from useAuth()
      console.log('Email verification successful:', response);
      Alert.alert('Success', 'Email verified successfully.');
      // Navigate to the next screen
    } catch (error) {
      console.error('Email verification failed:', error);
      Alert.alert('Error', 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>Enter the code sent to your email to continue.</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyEmail} disabled={loading}>
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

export default VerifyEmailScreen;
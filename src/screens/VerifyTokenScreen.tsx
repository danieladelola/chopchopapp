import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { verifyToken } from '../services/auth'; // Remove this import
import { useAuth } from '../context/AuthContext'; // Import useAuth

const VerifyTokenScreen = ({ navigation }) => {
  const { verifyToken } = useAuth(); // Destructure verifyToken from useAuth()
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyToken = async () => {
    setLoading(true);
    try {
      await verifyToken({ token }); // Use verifyToken from useAuth()
      console.log('Token verification successful:');
      Alert.alert('Success', 'Token verified successfully.');
      navigation.navigate('ResetPassword', { token });
    } catch (error) {
      console.error('Token verification failed:', error);
      Alert.alert('Error', 'Invalid token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Token</Text>
      <Text style={styles.subtitle}>Enter the token you received to continue.</Text>
      <TextInput
        style={styles.input}
        placeholder="Token"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyToken} disabled={loading}>
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

export default VerifyTokenScreen;
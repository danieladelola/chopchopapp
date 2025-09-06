import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import CheckBox from '@react-native-community/checkbox';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../constants/AppStyles';

const LoginScreen = ({ navigation }) => {
  const { login, guestLogin } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;
    setPhoneError('');
    setPasswordError('');

    if (!phone) {
      setPhoneError('Phone number is required.');
      isValid = false;
    } else {
      // Remove all non-digit characters, but keep a leading '+'
      const cleanedPhone = phone.startsWith('+') ? '+' + phone.slice(1).replace(/[^0-9]/g, '') : phone.replace(/[^0-9]/g, '');

      // Basic validation: check if it's not empty after cleaning and has a reasonable length
      // A more robust solution would involve a dedicated phone number parsing library
      if (cleanedPhone.length < 7 || cleanedPhone.length > 15) { // Common international phone number length range
        setPhoneError('Please enter a valid phone number (7-15 digits, optionally starting with +).');
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    try {
      // Determine field_type based on whether the input looks like an email or phone
      // For simplicity, assuming it's always phone for now based on the input field
      const fieldType = 'phone'; // Or 'email' if you add an email input field

      await login({
        email_or_phone: phone, // Use the phone state for this field
        password: password,
        field_type: fieldType,
        login_type: 'manual',
      });
    } catch (e: any) {
      console.error('Login failed:', e);
      Alert.alert('Error', e.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, phoneError ? styles.inputError : {}]}
            placeholder="e.g., +1234567890"
            placeholderTextColor={Colors.mediumGray}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setPhoneError(''); // Clear error on change
            }}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : {}]}
            placeholder="Enter your password"
            placeholderTextColor={Colors.mediumGray}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(''); // Clear error on change
            }}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.checkboxContainer}>
          {Platform.OS !== 'web' ? (
            <CheckBox
              value={rememberPassword}
              onValueChange={setRememberPassword}
              tintColors={{ true: Colors.darkGreen, false: Colors.mediumGray }}
            />
          ) : (
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
              style={styles.webCheckbox}
            />
          )}
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Logging in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.guestButton} onPress={guestLogin}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Spacing.large,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: Spacing.xLarge,
  },
  title: {
    fontSize: Typography.fontSize.xxLarge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginBottom: Spacing.tiny,
  },
  subtitle: {
    fontSize: Typography.fontSize.large,
    color: Colors.darkGray,
    marginBottom: Spacing.xLarge,
  },
  inputGroup: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  label: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.tiny,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.medium,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    ...Shadow,
    alignSelf: 'center',
  },
  inputError: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  errorText: {
    fontSize: Typography.fontSize.small,
    color: Colors.red,
    marginTop: Spacing.tiny,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: Spacing.medium,
    alignSelf: 'center',
  },
  checkboxLabel: {
    marginLeft: Spacing.small,
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  webCheckbox: {
    // Basic styling for web checkbox if needed
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: Spacing.large,
  },
  forgotPasswordText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGreen,
    fontWeight: Typography.fontWeight.medium,
  },
  primaryButton: {
    width: '80%',
    height: 55,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.medium,
    ...Shadow,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: Spacing.medium,
    marginBottom: Spacing.large,
  },
  signUpText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  signUpLink: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGreen,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.tiny,
  },
  guestButton: {
    width: '80%',
    height: 55,
    backgroundColor: Colors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.medium,
    ...Shadow,
  },
  guestButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default LoginScreen;
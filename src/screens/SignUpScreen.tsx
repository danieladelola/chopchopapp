import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../constants/AppStyles';


const SignUpScreen = ({ navigation }) => {
  const { signUp, guestLogin } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateInputs = () => {
    let isValid = true;
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneError('');

    if (!firstName) {
      setFirstNameError('First Name is required.');
      isValid = false;
    }

    if (!lastName) {
      setLastNameError('Last Name is required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Combine first and last name for 'name' field validation
    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName) {
      setFirstNameError('First Name and Last Name are required.'); // Or a more specific error for each
      setLastNameError('First Name and Last Name are required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }
    // Password must be at least 8 characters as per backend
    else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

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

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    try {
      await signUp({ name: `${firstName} ${lastName}`, email, password, phone, ref_code: referralCode });
      Alert.alert('Success', 'Sign up successful! Please log in.');
      navigation.navigate('Login');
    } catch (e: any) {
      console.error('Sign up failed:', e);
      Alert.alert('Error', e.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, firstNameError ? styles.inputError : {}]}
            placeholder="Enter your first name"
            placeholderTextColor={Colors.mediumGray}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError('');
            }}
            autoCapitalize="words"
          />
          {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, lastNameError ? styles.inputError : {}]}
            placeholder="Enter your last name"
            placeholderTextColor={Colors.mediumGray}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError('');
            }}
            autoCapitalize="words"
          />
          {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
        </View>

        

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : {}]}
            placeholder="Enter your email"
            placeholderTextColor={Colors.mediumGray}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, phoneError ? styles.inputError : {}]}
            placeholder="e.g., +1234567890"
            placeholderTextColor={Colors.mediumGray}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setPhoneError('');
            }}
            keyboardType="phone-pad"
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
              setPasswordError('');
            }}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, confirmPasswordError ? styles.inputError : {}]}
            placeholder="Confirm your password"
            placeholderTextColor={Colors.mediumGray}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            secureTextEntry
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelOptional}>Referral Code (Optional)</Text>
          <TextInput
            style={styles.inputOptional}
            placeholder="Enter referral code"
            placeholderTextColor={Colors.mediumGray}
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Sign In</Text>
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
  labelOptional: {
    fontSize: Typography.fontSize.small,
    color: Colors.mediumGray,
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
  inputOptional: {
    width: '80%',
    height: 40,
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.medium,
    fontSize: Typography.fontSize.small,
    color: Colors.darkGray,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
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
  signInContainer: {
    flexDirection: 'row',
    marginTop: Spacing.medium,
    marginBottom: Spacing.large,
  },
  signInText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
  },
  signInLink: {
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

export default SignUpScreen;
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, signUp as apiSignUp, guestLogin as apiGuestLogin } from '../services/auth';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

interface AuthContextType {
  isLoggedIn: boolean;
  isGuest: boolean;
  userToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  continueAsGuest: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userType = await AsyncStorage.getItem('userType');

        if (token) {
          setUserToken(token);
          if (userType === 'registered') {
            setIsLoggedIn(true);
            setIsGuest(false);
          } else {
            setIsLoggedIn(false);
            setIsGuest(true);
          }
        }
      } catch (e) {
        console.error('Failed to load or fetch token', e);
        setError('Failed to initialize session.');
      } finally {
        // Introduce a delay to ensure splash screen is visible for a duration
        setTimeout(() => {
          setIsLoading(false);
          if (Platform.OS !== 'web') {
            SplashScreen.hide(); // This hides the native splash screen
          }
        }, 2000); // 2-second delay
      }
    };
    loadSession();
  }, []);

  const login = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiLogin(data);
      if (response.data && response.data.token) {
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userType', 'registered');
        setUserToken(token);
        setIsLoggedIn(true);
        setIsGuest(false);
      } else {
        setError('Login failed: No token received.');
      }
    } catch (e: any) {
      setError(e.response?.data?.message || 'An unexpected error occurred during login.');
      console.error('Login error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: any) => {
    console.log('AuthContext: signUp started with data:', data);
    setIsLoading(true);
    // setError(null); // Removed to prevent potential re-render issues
    try {
      console.log('AuthContext: Calling apiSignUp...');
      const response = await apiSignUp(data);
      console.log('AuthContext: apiSignUp response received:', response);

      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log('AuthContext: Token received, setting AsyncStorage...');
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userType', 'registered');
        setUserToken(token);
        setIsLoggedIn(true);
        setIsGuest(false);
        console.log('AuthContext: User registered and logged in.');
      } else {
        // setError('Registration failed: No token received.'); // Removed
        console.warn('AuthContext: Registration failed, no token received in response.');
      }
    } catch (e: any) {
      // setError(e.response?.data?.message || 'An unexpected error occurred during registration.'); // Removed
      console.error('AuthContext: Registration error caught:', e);
    } finally {
      setIsLoading(false);
      console.log('AuthContext: signUp finished.');
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userType');
      setUserToken(null);
      setIsLoggedIn(false);
      setIsGuest(false);
    } catch (e) {
      setError('Failed to remove token from storage.');
      console.error('Logout error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiGuestLogin();
      if (response.data && response.data.token) {
        const guestToken = response.data.token;
        await AsyncStorage.setItem('userToken', guestToken);
        await AsyncStorage.setItem('userType', 'guest');
        setUserToken(guestToken);
        setIsLoggedIn(false);
        setIsGuest(true);
      }
    } catch (e) {
      setError('Failed to initialize session.');
      console.error('Guest login error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isGuest, userToken, isLoading, error, login, logout, signUp, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
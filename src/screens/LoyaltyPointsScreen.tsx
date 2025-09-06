import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoyaltyPointsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loyalty Points Screen</Text>
      {/* Loyalty points content will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#074425',
  },
});

export default LoyaltyPointsScreen;
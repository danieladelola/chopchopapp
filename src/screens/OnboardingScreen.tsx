import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Spacing, Typography, Colors, BorderRadius } from '../constants/AppStyles';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  { key: '1', title: 'Welcome to ChopChopAfrika!', description: 'The best place to find delicious food.', image: require('../assets/images/onbimg/eba.png') },
  { key: '2', title: 'Discover new restaurants', description: 'Explore a wide variety of cuisines.', image: require('../assets/images/onbimg/southfood.png') },
  { key: '3', title: 'Order with ease', description: 'Enjoy a seamless ordering experience.', image: require('../assets/images/onbimg/eba.png') },
];

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.onboardingImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.footer}>
        {currentIndex === onboardingData.length - 1 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={onComplete}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={onComplete} // Skip also completes onboarding
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.xLarge,
    paddingBottom: Spacing.large,
  },
  onboardingImage: {
    width: width * 0.8,
    height: height * 0.4, // ~40% of vertical space
    resizeMode: 'contain',
    marginBottom: Spacing.large,
  },
  title: {
    fontSize: Typography.fontSize.xLarge,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.medium,
    color: Colors.darkGreen,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.fontSize.medium,
    textAlign: 'center',
    color: Colors.darkGray,
    marginBottom: Spacing.xLarge,
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.medium,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: Spacing.medium,
  },
  dot: {
    width: Spacing.small,
    height: Spacing.small,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.mediumGray,
    marginHorizontal: Spacing.tiny,
  },
  activeDot: {
    backgroundColor: Colors.darkGreen,
  },
  button: {
    backgroundColor: Colors.orange,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.xLarge,
    borderRadius: BorderRadius.small,
    width: '90%', // Almost full width
    alignItems: 'center',
    marginBottom: Spacing.small, // Space between button and pagination
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
  },
  skipButton: {
    paddingVertical: Spacing.small,
    marginBottom: Spacing.medium,
  },
  skipButtonText: {
    color: Colors.darkGray,
    fontSize: Typography.fontSize.medium,
  },
});

export default OnboardingScreen;
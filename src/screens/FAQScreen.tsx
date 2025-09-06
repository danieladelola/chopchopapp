import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/AppStyles';

const FAQScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q1: How do I place an order?</Text>
        <Text style={styles.answer}>A: Download the app, sign up, pick your food, and confirm payment.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q2: Can I cancel my order?</Text>
        <Text style={styles.answer}>A: Yes, only before the vendor accepts it. After acceptance, follow vendor rules.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q3: How do refunds work?</Text>
        <Text style={styles.answer}>A: Refunds are issued for cancelled orders or failed deliveries, depending on the situation.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q4: How is my data used?</Text>
        <Text style={styles.answer}>A: We use your info for order processing, delivery, and improving our services. Data is secure.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q5: Who handles delivery?</Text>
        <Text style={styles.answer}>A: Delivery partners are independent. ChopChopAfrika only connects you with them.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q6: What if my food is wrong or late?</Text>
        <Text style={styles.answer}>A: Contact the vendor or support through the app. We assist but aren’t responsible for delays.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q7: Do you use cookies?</Text>
        <Text style={styles.answer}>A: Yes, to improve your app experience.</Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Q8: Is ChopChopAfrika safe?</Text>
        <Text style={styles.answer}>A: Yes. Payments are secure, and we follow UK data protection rules.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.medium,
  },
  title: {
    fontSize: Typography.fontSize.xLarge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGreen,
    marginBottom: Spacing.large,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: Spacing.medium,
  },
  question: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginBottom: Spacing.tiny,
  },
  answer: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    lineHeight: Typography.fontSize.medium * 1.5,
  },
});

export default FAQScreen;

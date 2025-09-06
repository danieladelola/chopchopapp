import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/AppStyles';

const LegalScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ChopChopAfrika Legal Terms (UK)</Text>

      <Text style={styles.sectionTitle}>1. Terms of Use</Text>
      <Text style={styles.paragraph}>
        By using ChopChopAfrika, you agree to follow our rules. Do not misuse the app, commit fraud, or harm others. Accounts may be suspended or closed for breaches.
      </Text>

      <Text style={styles.sectionTitle}>2. Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We collect your name, contact info, and location to process orders and improve services. Your data is never sold. We may share with vendors, delivery partners, or payment providers as required. Data is handled under UK GDPR.
      </Text>

      <Text style={styles.sectionTitle}>3. Payments and Refunds</Text>
      <Text style={styles.paragraph}>
        All payments are secure. Refunds apply only when orders are cancelled in time or if delivery fails.
      </Text>

      <Text style={styles.sectionTitle}>4. Cancellations</Text>
      <Text style={styles.paragraph}>
        Orders can be cancelled within a short period before vendor acceptance. After acceptance, cancellations follow vendor rules.
      </Text>

      <Text style={styles.sectionTitle}>5. Vendors and Delivery Partners</Text>
      <Text style={styles.paragraph}>
        Vendors ensure food quality. Delivery partners are independent and responsible for safe, timely delivery. ChopChopAfrika is a platform only.
      </Text>

      <Text style={styles.sectionTitle}>6. Liability</Text>
      <Text style={styles.paragraph}>
        We are not liable for delays, vendor mistakes, or issues beyond our control.
      </Text>

      <Text style={styles.sectionTitle}>7. Cookies and Tracking</Text>
      <Text style={styles.paragraph}>
        Cookies or similar tools may be used to improve your experience.
      </Text>

      <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content, logos, and brand names belong to ChopChopAfrika. Do not copy or use without permission.
      </Text>

      <Text style={styles.sectionTitle}>9. Governing Law</Text>
      <Text style={styles.paragraph}>
        These terms follow the laws of the United Kingdom.
      </Text>
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
  sectionTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.darkGray,
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
  },
  paragraph: {
    fontSize: Typography.fontSize.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
    lineHeight: Typography.fontSize.medium * 1.5,
  },
});

export default LegalScreen;

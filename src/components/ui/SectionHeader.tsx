import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/AppStyles';

interface SectionHeaderProps {
  title: string;
  onPressViewAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPressViewAll }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>VIEW ALL</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.medium,
    color: Colors.darkGray,
  },
  viewAllText: {
    fontSize: Typography.fontSize.small,
    color: Colors.orange,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default SectionHeader;

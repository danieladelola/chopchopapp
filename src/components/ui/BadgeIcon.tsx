import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/AppStyles';

interface BadgeIconProps {
  iconName: string;
  size: number;
  color: string;
  badgeCount?: number;
  onPress?: () => void;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ iconName, size, color, badgeCount, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
      <MaterialIcons name={iconName} size={size} color={color} />
      {badgeCount && badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
    marginLeft: 16, // Spacing.medium
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BadgeIcon;

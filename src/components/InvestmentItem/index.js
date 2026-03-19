import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView, AnimatePresence, MotiText } from 'moti';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function InvestmentItem({ data, onDelete, hideValues }) {
  const [showValue, setShowValue] = useState(false);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowValue(!showValue);
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        onDelete(data.id);
      }}
    >
      <AntDesign name="delete" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.badgeContainer}>
          <Text style={styles.typeBadge}>{data.type}</Text>
          <Text style={styles.date}>{data.tickets} cotas</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.ticker}>{data.ticker}</Text>
          {showValue ? (
            <AnimatePresence exitBeforeEnter>
              <MotiText
                style={styles.value}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
              >
                {hideValues ? 'R$ ••••' : `R$ ${data.value}`}
              </MotiText>
            </AnimatePresence>
          ) : (
            <AnimatePresence exitBeforeEnter>
              <MotiView
                style={styles.skeleton}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 250 }}
              />
            </AnimatePresence>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181b', // zinc-900
    borderRadius: 24,
    marginBottom: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeBadge: {
    color: '#34d399',
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  date: {
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 13,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ticker: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f4f4f5',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 20,
    color: '#f4f4f5',
    fontWeight: 'bold',
  },
  skeleton: {
    marginTop: 6,
    width: 80,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 24,
    marginBottom: 16,
    marginLeft: 12,
  },
});

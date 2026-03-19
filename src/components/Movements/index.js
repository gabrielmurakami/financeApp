import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView, AnimatePresence, MotiText } from 'moti';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function Movements({ data, onDelete, hideValues }) {
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
        <Text style={styles.date}>{data.date}</Text>

        <View style={styles.content}>
          <Text style={styles.label}>{data.label}</Text>
          {showValue ? (
            <AnimatePresence exitBeforeEnter>
              <MotiText
                style={data.type === 1 ? styles.value : styles.expanses}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
              >
                {hideValues ? 'R$ ••••' : (data.type === 1 ? `R$ ${data.value}` : `R$ - ${data.value}`)}
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  date: {
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 13,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#f4f4f5',
    letterSpacing: -0.5,
  },
  value: {
    fontSize: 18,
    color: '#34d399',
    fontWeight: 'bold',
  },
  expanses: {
    fontSize: 18,
    color: '#f43f5e',
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

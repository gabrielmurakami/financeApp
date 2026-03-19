import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';
import * as Haptics from 'expo-haptics';

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

export default function Header({ name, hideValues, onToggleValues, onProfilePress }) {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleValues();
  };

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{
          translateY: -20,
          opacity: 0
        }}
        animate={{
          translateY: 0,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 80,
          delay: 100
        }}
      >
        <MotiText
          style={styles.username}
          from={{
            opacity: 0,
            translateX: -10
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{
            type: 'spring',
            damping: 18,
            stiffness: 80,
            delay: 250
          }}
        >
          {name}
        </MotiText>

        <View style={styles.rightActions}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.eyeButton}
            onPress={handleToggle}
          >
            <Feather
              name={hideValues ? 'eye-off' : 'eye'}
              size={24}
              color="#e4e4e7"
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser} onPress={onProfilePress}>
            <Feather name="user" size={24} color="#34d399" />
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09090b', // Dark zinc for Liquid Digital
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    paddingStart: 24,
    paddingEnd: 24,
    paddingBottom: 54, // Leave room for balance overlap
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  username: {
    fontSize: 22,
    color: '#e4e4e7',
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },

  eyeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
  },

  buttonUser: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  }
});

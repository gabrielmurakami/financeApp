import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

export default function UserProfileModal({ onClose }) {
  return (
    <View style={styles.overlay}>
      <MotiView 
        style={styles.container}
        from={{ translateY: 200, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 90 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onClose(); }} style={styles.closeBtn}>
            <View style={styles.grabber} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://avatars.githubusercontent.com/u/49257630?v=4' }} // Can use github or generic avatar
              style={styles.avatar} 
            />
            <View style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          </View>
          <Text style={styles.name}>Gabriel Mk</Text>
          <Text style={styles.email}>gabriel.mk@liquid.finance</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Meses Ativo</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>BETA</Text>
            <Text style={styles.statLabel}>Plano Atual</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.editBtn}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Text style={styles.editBtnText}>Editar Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        >
          <Feather name="log-out" size={20} color="#f43f5e" />
          <Text style={styles.logoutBtnText}>Sair da Conta</Text>
        </TouchableOpacity>

      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#09090b', // zinc-950
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 32,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  closeBtn: {
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grabber: {
    width: 48,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#34d399', // Emerald
  },
  proBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#34d399',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#09090b',
  },
  proText: {
    color: '#09090b',
    fontSize: 10,
    fontWeight: '900',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f4f4f5',
    letterSpacing: -1,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#a1a1aa',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#18181b', // zinc-900
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f4f4f5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editBtn: {
    backgroundColor: '#34d399',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  editBtnText: {
    color: '#09090b',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 63, 94, 0.05)',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.1)',
    marginBottom: 16,
  },
  logoutBtnText: {
    color: '#f43f5e',
    fontWeight: '800',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: -0.3,
  }
});

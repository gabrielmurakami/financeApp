import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { useTheme } from '../../contexts/ThemeContext';

export default function Settings() {
  const { isDark, toggleTheme, theme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const styles = getStyles(theme);

  const handleToggleNotifications = () => {
    Haptics.selectionAsync();
    setNotifications(!notifications);
  };

  const handleClearCache = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Cache Limpo', 'O cache de imagens e animações foi limpado com sucesso.');
  };

  const handleClearData = () => {
    Alert.alert(
      'Apagar Histórico', 
      'Isso apagará permanentemente todas as suas movimentações financeiras do aparelho. Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Apagar Tudo', 
        style: 'destructive', 
        onPress: async () => {
          await AsyncStorage.removeItem('@financeApp:movements');
          await AsyncStorage.removeItem('@financeApp:investments');
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert('Pronto!', 'Dados limpos com sucesso. Recarregue o app para refletir na lista.');
        }
      }
    ]);
  };

  const SettingItem = ({ icon, title, type, value, onPress, IconProvider = Feather, index }) => (
    <MotiView 
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 250, delay: index * 50 }}
    >
      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={onPress} 
        activeOpacity={type === 'toggle' ? 1 : 0.7}
      >
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <IconProvider name={icon} size={20} color={theme.primary} />
          </View>
          <Text style={styles.settingTitle}>{title}</Text>
        </View>
        
        {type === 'toggle' ? (
          <TouchableOpacity 
            style={[styles.toggle, value ? styles.toggleActive : null]} 
            onPress={onPress}
          >
            <View style={[styles.toggleThumb, value ? styles.toggleThumbActive : null]} />
          </TouchableOpacity>
        ) : (
          <AntDesign name="right" size={20} color={theme.subText} />
        )}
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
        <SettingItem index={0} icon="bell" title="Notificações" type="toggle" value={notifications} onPress={handleToggleNotifications} />
        <SettingItem index={1} icon="moon" title="Tema Escuro" type="toggle" value={isDark} onPress={() => { Haptics.selectionAsync(); toggleTheme(); }} />
        <SettingItem index={2} icon="lock" title="Biometria / Face ID" type="toggle" value={false} onPress={() => {}} />

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>DADOS & PRIVACIDADE</Text>
        <SettingItem index={3} icon="cloud-off" title="Limpar Cache Local" onPress={handleClearCache} />
        <SettingItem index={4} icon="trash-2" title="Resetar Financeiro" onPress={handleClearData} />
        <SettingItem index={5} icon="file-text" title="Termos de Uso" onPress={() => Haptics.impactAsync()} />

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>SOBRE</Text>
        <SettingItem index={6} icon="info" title="Versão do App (1.0.0)" onPress={() => {}} />

      </ScrollView>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.background, 
    padding: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 32,
  },
  title: { 
    color: theme.text, 
    fontSize: 32, 
    fontWeight: '800',
    letterSpacing: -1,
  },
  sectionTitle: {
    color: theme.subText,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.buttonActive,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.background,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: theme.border,
  },
  toggleActive: {
    backgroundColor: theme.buttonActive,
    borderColor: theme.primary,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.subText,
  },
  toggleThumbActive: {
    backgroundColor: theme.primary,
    transform: [{ translateX: 22 }],
  }
});

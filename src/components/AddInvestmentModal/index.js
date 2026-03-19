import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

export default function AddInvestmentModal({ onClose, onSave }) {
  const [ticker, setTicker] = useState('');
  const [tickets, setTickets] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('FII');

  const handleSave = () => {
    const parsedValue = parseFloat(value.replace(',', '.'));
    const parsedTickets = tickets ? parseFloat(tickets.replace(',', '.')) : 1;

    if (!ticker || !value || isNaN(parsedValue) || isNaN(parsedTickets) || parsedValue <= 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSave({
      id: String(Date.now()),
      ticker: ticker.toUpperCase(),
      tickets: parsedTickets,
      value: parsedValue.toFixed(2).replace('.', ','),
      date: new Date().toLocaleDateString('pt-BR'),
      type,
    });
  };

  const TypeButton = ({ label }) => (
    <TouchableOpacity 
      style={[styles.typeBtn, type === label && styles.typeBtnActive]}
      onPress={() => {
        Haptics.selectionAsync();
        setType(label);
      }}
    >
      <Text style={[styles.typeText, type === label && styles.typeTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlay}>
      <MotiView 
        style={styles.container}
        from={{ translateY: 20, opacity: 0, scale: 0.95 }}
        animate={{ translateY: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 90 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Novo Ativo</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        <View style={styles.typeContainer}>
          <TypeButton label="FII" />
          <TypeButton label="Ações" />
          <TypeButton label="Cripto" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Ticker (ex: MXRF11)"
          placeholderTextColor="#71717a"
          value={ticker}
          onChangeText={setTicker}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="Qtd (ex: 10)"
              placeholderTextColor="#71717a"
              keyboardType="numeric"
              value={tickets}
              onChangeText={setTickets}
            />
          </View>
          
          <View style={{ flex: 1 }}>
            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="Preço (ex: 10.50)"
              placeholderTextColor="#71717a"
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Confirmar</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: '#09090b',
    borderRadius: 32,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f4f4f5',
    letterSpacing: -0.5,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  typeBtnActive: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderColor: '#34d399',
  },
  typeText: {
    color: '#a1a1aa',
    fontWeight: '700',
    fontSize: 14,
  },
  typeTextActive: {
    color: '#34d399',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: '#e4e4e7',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#e4e4e7',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#09090b',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: -0.5,
  }
});

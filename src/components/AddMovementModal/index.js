import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

export default function AddMovementModal({ onClose, onSave }) {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState(0); // 0 = despesa, 1 = receita

  const handleSave = () => {
    if (!label || !value) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSave({
      id: String(Date.now()),
      label,
      value: parseFloat(value.replace(',', '.')).toFixed(2).replace('.', ','),
      date: new Date().toLocaleDateString('pt-BR'),
      type,
    });
  };

  return (
    <View style={styles.overlay}>
      <MotiView 
        style={styles.container}
        from={{ translateY: 20, opacity: 0, scale: 0.95 }}
        animate={{ translateY: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 90 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Nova Movimentação</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <AntDesign name="close" size={24} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Descrição (ex: Supermercado)"
          placeholderTextColor="#71717a"
          value={label}
          onChangeText={setLabel}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Valor (ex: 150.00)"
          placeholderTextColor="#71717a"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <View style={styles.typeContainer}>
          <TouchableOpacity 
            style={[styles.typeBtn, type === 1 && styles.typeBtnActiveIncome]}
            onPress={() => {
              Haptics.selectionAsync();
              setType(1);
            }}
          >
            <Text style={[styles.typeText, type === 1 && styles.typeTextActiveIncome]}>Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeBtn, type === 0 && styles.typeBtnActiveExpense]}
            onPress={() => {
              Haptics.selectionAsync();
              setType(0);
            }}
          >
            <Text style={[styles.typeText, type === 0 && styles.typeTextActiveExpense]}>Saída</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Adicionar Valor</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)', // dark blur fallback
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: '#09090b', // zinc-950
    borderRadius: 32,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
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
  typeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
    marginTop: 8,
  },
  typeBtn: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  typeBtnActiveIncome: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderColor: '#34d399',
  },
  typeBtnActiveExpense: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderColor: '#f43f5e',
  },
  typeText: {
    color: '#a1a1aa',
    fontWeight: '700',
    fontSize: 16,
  },
  typeTextActiveIncome: {
    color: '#34d399',
  },
  typeTextActiveExpense: {
    color: '#f43f5e',
  },
  saveBtn: {
    backgroundColor: '#e4e4e7',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#09090b',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: -0.5,
  }
});

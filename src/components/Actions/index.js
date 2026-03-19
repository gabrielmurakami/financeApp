import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function Actions({ onAddMovement }) {
  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddMovement();
  };

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    >
      <TouchableOpacity style={styles.actionButton} onPress={handleAdd}>
        <View style={styles.areaButton}>
          <AntDesign name="plus" size={26} color="#09090b" />
        </View>
        <Text style={styles.labelButton}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButtonSecondary}>
          <AntDesign name="tagso" size={26} color="#e4e4e7" />
        </View>
        <Text style={styles.labelButton}>Compras</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButtonSecondary}>
          <AntDesign name="creditcard" size={26} color="#e4e4e7" />
        </View>
        <Text style={styles.labelButton}>Carteira</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButtonSecondary}>
          <AntDesign name="barcode" size={26} color="#e4e4e7" />
        </View>
        <Text style={styles.labelButton}>Boletos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButtonSecondary}>
          <AntDesign name="setting" size={26} color="#e4e4e7" />
        </View>
        <Text style={styles.labelButton}>Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 120,
    marginBottom: 16,
    marginTop: 32,
  },
  actionButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  areaButton: {
    backgroundColor: '#34d399',
    height: 68,
    width: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34d399',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  areaButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    height: 68,
    width: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  labelButton: {
    marginTop: 12,
    textAlign: 'center',
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 13,
  },
});

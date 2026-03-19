import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MotiView } from 'moti';

export default function Balance({ saldo, gastos, hideValues }) {
  return (
    <MotiView
      style={styles.container}
      from={{
        translateY: 30,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 70,
        delay: 250,
      }}
    >
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saldo Disponível</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.balance}>
            {hideValues ? '••••' : saldo}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saídas</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.expenses}>
            {hideValues ? '••••' : gastos}
          </Text>
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900 with transparency
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -32,
    marginHorizontal: 20,
    borderRadius: 24,
    paddingVertical: 24,
    zIndex: 99,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },

  divider: {
    height: 40,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 14,
    color: '#a1a1aa',
    fontWeight: '500',
    marginBottom: 6,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  currencySymbol: {
    color: '#a1a1aa',
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
  },

  balance: {
    fontSize: 24,
    color: '#34d399', // emerald-400
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },

  expenses: {
    fontSize: 24,
    color: '#f43f5e', // rose-500
    fontWeight: 'bold',
    letterSpacing: -0.5,
  }
});

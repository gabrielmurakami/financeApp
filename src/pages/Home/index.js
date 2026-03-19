import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Movements from '../../components/Movements';
import Actions from '../../components/Actions';
import AddMovementModal from '../../components/AddMovementModal';
import UserProfileModal from '../../components/UserProfileModal';
import { useTheme } from '../../contexts/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [hideValues, setHideValues] = useState(false);
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const [saldo, setSaldo] = useState('0,00');
  const [gastos, setGastos] = useState('0,00');

  useFocusEffect(
    useCallback(() => {
      loadMovements();
    }, [])
  );

  useEffect(() => {
    calculateBalance();
  }, [list]);

  const loadMovements = async () => {
    try {
      const storagedList = await AsyncStorage.getItem('@financeApp:movements');
      if (storagedList) {
        setList(JSON.parse(storagedList));
      } else {
        // Fallback default info if list represents new users
        const defaultList = [
          {
            id: '1',
            label: 'Salário',
            value: '7000,00',
            date: new Date().toLocaleDateString('pt-BR'),
            type: 1 
          }
        ];
        setList(defaultList);
        await AsyncStorage.setItem('@financeApp:movements', JSON.stringify(defaultList));
      }
    } catch (e) {
      console.log('Error loading data', e);
    }
  };

  const saveMovements = async (newList) => {
    setList(newList);
    try {
      await AsyncStorage.setItem('@financeApp:movements', JSON.stringify(newList));
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    list.forEach((item) => {
      const valueFormatted = parseFloat(String(item.value).replace('.', '').replace(',', '.'));
      if (!isNaN(valueFormatted)) {
        if (item.type === 1) {
          totalIncome += valueFormatted;
        } else {
          totalExpense += valueFormatted;
        }
      }
    });

    const currentBalance = totalIncome - totalExpense;

    setSaldo(currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setGastos(totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  };

  const handleAddMovement = (newMovement) => {
    const newList = [newMovement, ...list];
    saveMovements(newList);
    setIsModalVisible(false);
  };

  const handleDeleteMovement = (id) => {
    const newList = list.filter((item) => item.id !== id);
    saveMovements(newList);
  };

  const renderItem = useCallback(({ item }) => (
    <Movements data={item} onDelete={handleDeleteMovement} hideValues={hideValues} />
  ), [list, hideValues]);

  const keyExtractor = useCallback((item) => String(item.id), []);

  return (
    <View style={styles.container}>
      <Header name="Gabriel Mk" hideValues={hideValues} onToggleValues={() => setHideValues(prev => !prev)} onProfilePress={() => setIsProfileModalVisible(true)} />
      <Balance saldo={saldo} gastos={gastos} hideValues={hideValues} />

      <Actions onAddMovement={() => setIsModalVisible(true)} />

      <Text style={styles.title}>Últimas movimentações</Text>
      
      <FlatList 
        style={styles.list}
        data={list}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Sem movimentações ainda.</Text>
            <Text style={styles.emptySubText}>Que tal adicionar sua primeira entrada ou saída?</Text>
          </View>
        }
      />

      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <AddMovementModal 
          onClose={() => setIsModalVisible(false)} 
          onSave={handleAddMovement} 
        />
      </Modal>

      <Modal visible={isProfileModalVisible} animationType="fade" transparent={true}>
        <UserProfileModal onClose={() => setIsProfileModalVisible(false)} />
      </Modal>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, 
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginHorizontal: 24,
    marginBottom: 16,
    color: theme.text,
    letterSpacing: -0.5,
  },
  list: {
    paddingHorizontal: 24,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.subText,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubText: {
    color: theme.subText,
    opacity: 0.8,
    textAlign: 'center',
    fontSize: 14,
  }
});

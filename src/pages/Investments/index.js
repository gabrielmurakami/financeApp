import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import InvestmentItem from '../../components/InvestmentItem';
import AddInvestmentModal from '../../components/AddInvestmentModal';
import UserProfileModal from '../../components/UserProfileModal';
import { MotiView } from 'moti';
import { useTheme } from '../../contexts/ThemeContext';

export default function Investments() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [hideValues, setHideValues] = useState(false);
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [totalInvested, setTotalInvested] = useState('0,00');

  useFocusEffect(
    useCallback(() => {
      loadInvestments();
    }, [])
  );

  useEffect(() => {
    calculateTotal();
  }, [list]);

  const loadInvestments = async () => {
    try {
      const storagedList = await AsyncStorage.getItem('@financeApp:investments');
      if (storagedList) {
        setList(JSON.parse(storagedList));
      }
    } catch (e) {
      console.log('Error loading data', e);
    }
  };

  const saveInvestments = async (newList) => {
    setList(newList);
    try {
      await AsyncStorage.setItem('@financeApp:investments', JSON.stringify(newList));
    } catch (e) {
      console.log('Error saving data', e);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    list.forEach((item) => {
      const price = parseFloat(item.value.replace('.', '').replace(',', '.'));
      const amt = item.tickets;
      total += price * amt;
    });

    setTotalInvested(total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  };

  const handleAddInvestment = (newItem) => {
    const newList = [newItem, ...list];
    saveInvestments(newList);
    setIsModalVisible(false);
  };

  const handleDeleteInvestment = (id) => {
    const newList = list.filter((item) => item.id !== id);
    saveInvestments(newList);
  };

  const renderItem = useCallback(({ item }) => (
    <InvestmentItem data={item} onDelete={handleDeleteInvestment} hideValues={hideValues} />
  ), [list, hideValues]);

  const keyExtractor = useCallback((item) => String(item.id), []);

  return (
    <View style={styles.container}>
      <Header name="Gabriel Mk" hideValues={hideValues} onToggleValues={() => setHideValues((prev) => !prev)} onProfilePress={() => setIsProfileModalVisible(true)} />
      
      <MotiView
        style={styles.balanceContainer}
        from={{ translateY: 30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 18, stiffness: 70, delay: 250 }}
      >
        <Text style={styles.itemTitle}>Patrimônio Investido</Text>
        <View style={styles.contentRow}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.balance}>
            {hideValues ? '••••' : totalInvested}
          </Text>
        </View>
      </MotiView>

      <View style={styles.headerSection}>
        <Text style={styles.title}>Meus Ativos</Text>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setIsModalVisible(true);
          }}
        >
          <AntDesign name="plus" size={20} color="#09090b" />
          <Text style={styles.addBtnText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        style={styles.list}
        data={list}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Carteira vazia.</Text>
            <Text style={styles.emptySubText}>Que tal registrar seus primeiros investimentos?</Text>
          </View>
        }
      />

      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <AddInvestmentModal 
          onClose={() => setIsModalVisible(false)} 
          onSave={handleAddInvestment} 
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
  balanceContainer: {
    backgroundColor: theme.cardTranslucent,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -32,
    marginHorizontal: 20,
    borderRadius: 24,
    paddingVertical: 24,
    zIndex: 99,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  itemTitle: {
    fontSize: 14,
    color: theme.subText,
    fontWeight: '500',
    marginBottom: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: theme.subText,
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  balance: {
    fontSize: 28,
    color: theme.primary,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 20,
    marginTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.text,
    letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  addBtnText: {
    color: theme.background,
    fontWeight: '700',
    fontSize: 14,
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
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
  }
});

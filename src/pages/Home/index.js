import { StyleSheet, Text, View, FlatList } from 'react-native'

import Header from '../../components/Header'
import Balance from '../../components/Balance'
import Movements from '../../components/Movements'
import Actions from '../../components/Actions'

const list = [
  {
    id: 1,
    label: 'Boleto conta luz',
    value: '300,90',
    date: '17/05/2022',
    type: 0 // despesas
  },
  {
    id: 2,
    label: 'Pix Client X',
    value: '100,00',
    date: '20/05/2022',
    type: 1 // receita /entradas
  },
  {
    id: 3,
    label: 'Salário',
    value: '7.000,00',
    date: '25/05/2022',
    type: 1 // receita / entradas
  }
]

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name="Gabriel Mk" />
      <Balance saldo="12.000,00" gastos="-524,00" />

      <Actions/>

      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList 
      style={styles.list}
      data={list}
      keyExtractor={ (item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={ ({ item }) => <Movements data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },

  list: {
    marginStart: 14,
    marginEnd:14,
  }
})

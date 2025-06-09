import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Expense } from '../types';
import { generateUUID } from '../utils/uuid';
import ExpenseItem from '../components/ExpenseItem';
import { getCategoryDetails } from '../utils/CategoryMap';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const STORAGE_KEY = 'expenses';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load stored expenses
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setExpenses(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load expenses:', err);
      }
    };
    loadExpenses();
  }, []);

  // Save expenses when they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch((err) =>
      console.error('Failed to save expenses:', err)
    );
  }, [expenses]);

  // Add new expense callback passed to AddExpense screen
  const handleAddExpense = (data: { amount: number; category: string; date: string }) => {
  const { icon, color } = getCategoryDetails(data.category);

  const newItem: Expense = {
    id: generateUUID(),
    ...data,
    icon,
    color,
  };

  setExpenses((prev) => [newItem, ...prev]);
};

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4f6ef7" barStyle="light-content" />
      <Text style={styles.header}>💸 Expense Tracker</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddExpense', { onAddExpense: handleAddExpense })}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem item={item} onDelete={deleteExpense} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet. Start adding!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#4f6ef7',
  },
  summaryBox: {
    backgroundColor: '#e4e8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3dfa',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#4f6ef7',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 16,
  },
});

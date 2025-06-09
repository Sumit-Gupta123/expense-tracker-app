import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoryPicker from '../components/CategoryPicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

export default function AddExpenseScreen({ navigation, route }: Props) {
  const { onAddExpense } = route.params;

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onAdd = () => {
    if (!amount || !category) return alert('Please fill all fields!');
    onAddExpense({
      amount: parseFloat(amount),
      category,
      date: date.toISOString(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Add New Expense</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Amount (₹)</Text>
        <TextInput
          placeholder="e.g. 250"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        <Text style={styles.label}>Category</Text>
        <CategoryPicker selected={category} onChange={setCategory} />
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowPicker(false);
              setDate(currentDate);
            }}
          />
        )}
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8ff', padding: 20, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4f6ef7', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 4 },
  label: { fontSize: 14, marginBottom: 6, color: '#333', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  dateButton: { padding: 10, backgroundColor: '#e4e8ff', borderRadius: 8, marginTop: 4 },
  dateText: { fontSize: 16, color: '#1e3dfa', textAlign: 'center' },
  addButton: { backgroundColor: '#4f6ef7', padding: 12, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

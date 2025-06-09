import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onAddExpense: (title: string, amount: string) => void;
}

export default function ExpenseForm({ onAddExpense }: Props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Expense" onPress={() => {
        if (title && amount) {
          onAddExpense(title, amount);
          setTitle('');
          setAmount('');
        }
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../types';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  item: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ item, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
          <FontAwesome5 name={item.icon as any} size={16} color="#fff" />
        </View>
        <View style={styles.info}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
        <Text style={styles.deleteText} onPress={() => onDelete(item.id)}>✕</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  info: {
    justifyContent: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteText: {
    fontSize: 18,
    color: '#ff4d4d',
    marginTop: 6,
  },
});


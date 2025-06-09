import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';

// Category options with icons and colors
const categories = [
  { name: 'Food', icon: 'utensils', color: '#FF7043' },
  { name: 'Transport', icon: 'bus', color: '#29B6F6' },
  { name: 'Shopping', icon: 'shopping-bag', color: '#AB47BC' },
  { name: 'Utilities', icon: 'bolt', color: '#FFD600' },
  { name: 'Other', icon: 'question-circle', color: '#BDBDBD' },
];

interface Props {
  selected: string;
  onChange: (value: string) => void;
}

export default function CategoryPicker({ selected, onChange }: Props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (name: string) => {
    onChange(name);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selected ? `📂 ${selected}` : 'Select Category'}
        </Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.name)}
              >
                <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
                  <FontAwesome5 name={item.icon as any} size={16} color="white" />
                </View>
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  selector: {
    padding: 12,
    backgroundColor: '#e4e8ff',
    borderRadius: 8,
  },
  selectorText: {
    fontSize: 16,
    color: '#1e3dfa',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

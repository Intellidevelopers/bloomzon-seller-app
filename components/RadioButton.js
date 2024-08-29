import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={styles.container}>
      <RadioButton
        label="Option 1"
        selected={selectedOption === 'option1'}
        onPress={() => setSelectedOption('option1')}
      />
      <RadioButton
        label="Option 2"
        selected={selectedOption === 'option2'}
        onPress={() => setSelectedOption('option2')}
      />
      <RadioButton
        label="Option 3"
        selected={selectedOption === 'option3'}
        onPress={() => setSelectedOption('option3')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

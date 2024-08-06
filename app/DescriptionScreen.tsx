import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DescriptionScreen: React.FC<{ goToNextTab: () => void }> = ({ goToNextTab }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Variations</Text>
      <Button title="Next" onPress={goToNextTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DescriptionScreen;

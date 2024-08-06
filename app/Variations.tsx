import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Button, Dimensions, SafeAreaView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Variations = () => {
  const [variations, setVariations] = useState([
    { color: 'Brown', size: 'Small', sku: 'BAG-BROWN-SMALL' },
    { color: 'Brown', size: 'Medium', sku: 'BAG-BROWN-MEDIUM' },
    { color: 'Brown', size: 'Large', sku: 'BAG-BROWN-LARGE' },
    { color: 'Black', size: 'Small', sku: 'BAG-BLACK-SMALL' },
    { color: 'Black', size: 'Medium', sku: 'BAG-BLACK-MEDIUM' },
    { color: 'Black', size: 'Large', sku: 'BAG-BLACK-LARGE' },
  ]);

  const handleSKUChange = (index: number, value: string) => {
    const newVariations = [...variations];
    newVariations[index].sku = value;
    setVariations(newVariations);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center", left: -5}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22}/>
      </TouchableOpacity>
      <Text style={{fontSize: 18, fontFamily: "Semibold", left: 65, top: 25}}>Variations</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Color</Text>
        <Text style={styles.headerText}>Size</Text>
        <Text style={styles.headerText}>Seller SKU</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {variations.map((variation, index) => (
          <View key={index} style={styles.variationRow}>
            <Text style={styles.variationText}>{variation.color}</Text>
            <Text style={styles.variationText}>{variation.size}</Text>
            <TextInput
              style={styles.variationInput}
              value={variation.sku}
              onChangeText={(text) => handleSKUChange(index, text)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/Offers')}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: 240
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Semibold',
    flex: 1,
    textAlign: 'center',
    left: -4,
  },
  scrollView: {
    flex: 1,
  },
  variationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  variationText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  variationInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: 12
  },
});

export default Variations;

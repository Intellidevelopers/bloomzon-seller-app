import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VariationsScreen = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [colorInputs, setColorInputs] = useState<string[]>(['']);
  const [sizeInputs, setSizeInputs] = useState<string[]>(['']);

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const addColorInput = () => {
    setColorInputs([...colorInputs, '']);
  };

  const addSizeInput = () => {
    setSizeInputs([...sizeInputs, '']);
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colorInputs];
    newColors[index] = value;
    setColorInputs(newColors);
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...sizeInputs];
    newSizes[index] = value;
    setSizeInputs(newSizes);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center", marginTop: -35, justifyContent: "space-between"}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22}/>
      </TouchableOpacity>
      <Text style={{fontSize: 18, fontFamily: "Semibold", top: 25}}>Variations</Text>
      <TouchableOpacity style={styles.backButton2}>
      </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <View style={ styles.activeProgressBar} />
          <Text style={styles.progressLabel}>Info</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.activeProgressBar} />
          <Text style={styles.progressLabel}>Variations</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Offers</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Gallery</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Description</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Keywords</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Choose variation type</Text>

      {['Color', 'Size', 'Edition'].map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.checkboxContainer}
          onPress={() => toggleType(type)}
        >
          <View
            style={[
              styles.checkbox,
              selectedTypes.includes(type) && styles.checkboxChecked,
            ]}
          >
            {selectedTypes.includes(type) && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>{type}</Text>
        </TouchableOpacity>
      ))}
    <View style={{borderBottomWidth: 1, marginBottom: 20, borderBottomColor: "#ddd"}}></View>

      {selectedTypes.includes('Color') && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Color</Text>
          {colorInputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder="Enter color"
              value={input}
              onChangeText={(text) => handleColorChange(index, text)}
            />
          ))}
          <TouchableOpacity onPress={addColorInput}>
            <Text style={styles.addMore}>+ Add more</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTypes.includes('Size') && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Size</Text>
          {sizeInputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder="Enter size"
              value={input}
              onChangeText={(text) => handleSizeChange(index, text)}
            />
          ))}
          <TouchableOpacity onPress={addSizeInput}>
            <Text style={styles.addMore}>+ Add more</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 15}}>
        <TouchableOpacity style={{backgroundColor: "#eee", padding: 18, paddingHorizontal: 65, borderRadius: 8, borderWidth: 2, borderColor: "#ddd"}} onPress={() => router.push('/Offers')}>
          <Text style={{color: "#555", fontFamily: "Regular"}}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: "#FF8C00", padding: 18, paddingHorizontal: 35, borderRadius: 8,}} onPress={() => router.push('/Variations')}>
          <Text style={{color: "#fff", fontFamily: "Regular"}}>Add Variations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    width: SCREEN_WIDTH
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 40,
    width: '105%',
    alignSelf: "center"
  },
  progressItem: {
    alignItems: 'center',
  },
  activeProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: '#00D1A3',
    borderRadius: 10

  },
  inactiveProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: '#ccc',
    borderRadius: 10
  },
  progressLabel: {
    marginTop: 5,
    fontSize: 10,
    color: '#555',
  },

  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontFamily: 'Semibold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
    borderWidth: 1,
    borderColor: "#DDD"
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: "Regular"
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addMore: {
    color: '#00D1A3',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: -10
  },
});

export default VariationsScreen;

import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDescription = () => {
  const [description, setDescription] = useState('');
  const [bulletPoints, setBulletPoints] = useState(['']);

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, '']);
  };

  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = value;
    setBulletPoints(newBulletPoints);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "space-between", marginTop: -30 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Product Description</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Info</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Variations</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Offers</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Gallery</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Description</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
            <Text style={styles.progressLabel}>Keywords</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Detailed Description</Text>
        <Text style={styles.subtitle}>
          Provide clear and concise information about your product. Highlight key features and specifications to assist customers in their purchase decision.
        </Text>
        <Text style={styles.label}>Product description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          placeholder="Enter detailed information about your product here. Highlight its unique features, dimensions, and materials used. It helps customers to understand why your product is perfect for their needs."
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Bullet point</Text>
        {bulletPoints.map((point, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Bullet Point ${index + 1}`}
            value={point}
            onChangeText={(value) => updateBulletPoint(index, value)}
          />
        ))}
        <TouchableOpacity onPress={addBulletPoint}>
          <Text style={styles.addMore}>+ Add more</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => {router.push('/Keywords')}}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 80, // Ensure content is not hidden behind the button
  },
  title: {
    fontSize: 18,
    fontFamily: 'Semibold',
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 10,
    color: "#666",
    fontFamily: "Regular"
  },
  label: {
    fontSize: 17,
    marginTop: 20,
    fontFamily: 'Semibold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  addMore: {
    color: '#00D1A3',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
  },
  buttonText: {
    color: 'white',
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
    left: 10
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

export default ProductDescription;

import { FlatList, ListRenderItemInfo, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { JSXElementConstructor, ReactElement, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const BloomzonShip = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [modalData, setModalData] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState({
    category: '',
    subcategory: '',
    type: '',
    select: '',
    brand: '',
    bookingDate: ''
  });

  const openModal = (field: string) => {
    let data: string[] = [];
    switch (field) {
      case 'State/Region':
        data = ['Oyo', 'Anambra', 'Rivers'];
        break;
      case 'City':
        data = ['Ibadan', 'Awka', 'Portharcourt'];
        break;
      default:
        break;
    }
    setModalData(data);
    setSelectedField(field);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedField('');
  };

  const selectItem = (item: string) => {
    setSelectedValues(prevValues => ({ ...prevValues, [selectedField.toLowerCase() as keyof typeof selectedValues]: item }));
    closeModal();
  };

  const renderModalItem = ({ item }: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => selectItem(item)}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );
    

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -20, justifyContent: "space-between", marginBottom: 20 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", top: 25 }}>Register</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>

      <Text style={{fontWeight: "700", fontSize: 18, marginBottom: 20}}>
        Register for Bloomzon Ship
      </Text>

      {['State/Region', 'City'].map((field) => (
        <View key={field} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>
            {field}
          </Text>

          <TouchableOpacity onPress={() => openModal(field)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#eee',
                padding: 10,
                width: '100%',
                alignSelf: 'center',
                borderRadius: 7,
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: 'Regular', color: '#666', fontSize: 15 }}>
                {selectedValues[field.toLowerCase() as keyof typeof selectedValues] || `Select ${field.toLowerCase()}`}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" color={'#666'} size={30} />
            </View>
          </TouchableOpacity>
        </View>
      ))}

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/RegisterAsBloomzon')}>
            <Text style={styles.loginButtonText}>Save & Continue</Text>
        </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={modalData}
                renderItem={renderModalItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default BloomzonShip

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  backButton: {
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  label:{
    fontWeight: "600",
    fontSize: 18
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '92%',
    alignSelf: "center",
    marginTop: '100%'
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
});

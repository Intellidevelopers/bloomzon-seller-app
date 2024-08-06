import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Filter = () => {
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
      case 'Date Range':
        data = ['Last 7 days', 'Last Month', 'Last year'];
        break;
      case 'Sort By':
        data = ['Mobile Phones', 'Laptops', 'Tablets'];
        break;
      case 'Product Details':
        data = ['Tecno', 'iPhone', 'Samsung'];
        break;
      case 'Shipping Method':
        data = ['Pickup', 'Waybill', 'COD'];
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

  const renderModalItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const toggleRememberMe = () => {
    setSelectedValues(prevValues => ({ ...prevValues, brand: prevValues.brand ? '' : 'No Brand' }));
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedValues(prevValues => ({ ...prevValues, bookingDate: date.toLocaleDateString() }));
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center", gap: 95}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22}/>
      </TouchableOpacity>
      <Text style={{fontSize: 18, fontFamily: "Semibold",  top: 25}}>Filter</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.progressContainer}>
        
      </View>


        {['Date Range', 'Sort By', 'Product Details', 'Shipping Method'].map((field) => (
          <View key={field} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Medium', left: 15 }}>
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
                  width: '91%',
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

      
        <View style={{flexDirection: "row", gap: 15, alignSelf: "center", marginTop: 120}}>
            <TouchableOpacity style={{
                backgroundColor: '#f5f5f5',
                paddingVertical: 13,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 20,
                width: '42%',
                alignSelf: "center",
                borderWidth: 2,
                borderColor: "#ddd"
            }} onPress={() => router.push('/Inventory')}>
              <Text style={{
                color: '#555',
                fontSize: 16,
                fontFamily: 'Regular',
              }}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Inventory')}>
                <Text style={styles.loginButtonText}>Apply Filter</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <FlatList
              data={modalData}
              renderItem={renderModalItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 40
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
  },
  rememberMe: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#666"
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
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'blue',
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
    width: '42%',
    alignSelf: "center",
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  
});

export default Filter;

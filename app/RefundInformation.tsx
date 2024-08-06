import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RefundInformation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [modalData, setModalData] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState({
    reason: '',
    brand: '',
    orderAmount: '',
    taxOnOrderAmount: '',
    amountToRefund: '',
    taxOnAmountToRefund: ''
  });

  const router = useRouter();

  const openModal = (field: string) => {
    let data: string[] = [];
    switch (field) {
      case 'Reason for Refund':
        data = ['Could not Ship', 'Buyer Return', 'General Adjustment', 'Customer Reject', 'Buyer Cancelled', 'Different Item'];
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

  const renderModalItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const toggleRememberMe = () => {
    setSelectedValues(prevValues => ({ ...prevValues, brand: prevValues.brand ? '' : 'No Brand' }));
  };

  const selectItem = (item: string) => {
    if (selectedField === 'Reason for Refund') {
      setSelectedValues(prevValues => ({ ...prevValues, reason: item }));
    }
    closeModal();
  };

  const handleContinue = () => {
    router.push({
      pathname: '/RefundSummary',
      params: {
        amountToRefund: selectedValues.amountToRefund,
        taxOnAmountToRefund: selectedValues.taxOnAmountToRefund,
        reason: selectedValues.reason,
      },
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 35 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Refund Information</Text>
      </View>
      <ScrollView>
        <View style={{ left: 16, marginBottom: 20 }}>
          <Text style={{ fontFamily: "Semibold", fontSize: 18 }}>
            Refund Details
          </Text>
          <Text style={{ fontFamily: "Regular", fontSize: 14, color: "#666", padding: 10, left: -10, }}>
            Provide the necessary details to process the refund. Select a reason for the refund and specify the amount to be refunded to the buyer
          </Text>
        </View>
        {['Reason for Refund'].map((field) => (
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
                  {selectedValues.reason || `Select ${field.toLowerCase()}`}
                </Text>
                <MaterialIcons name="keyboard-arrow-down" color={'#666'} size={30} />
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Medium', left: 15 }}>
            Order Amount
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="300"
              keyboardType="default"
              value={selectedValues.orderAmount}
              onChangeText={(text) => setSelectedValues({ ...selectedValues, orderAmount: text })}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Medium', left: 15 }}>
            Tax on Order Amount
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="20"
              keyboardType="default"
              value={selectedValues.taxOnOrderAmount}
              onChangeText={(text) => setSelectedValues({ ...selectedValues, taxOnOrderAmount: text })}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Medium', left: 15 }}>
            Amount to Refund
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="300"
              keyboardType="default"
              value={selectedValues.amountToRefund}
              onChangeText={(text) => setSelectedValues({ ...selectedValues, amountToRefund: text })}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Medium', left: 15 }}>
            Tax on Amount to Refund
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="20"
              keyboardType="default"
              value={selectedValues.taxOnAmountToRefund}
              onChangeText={(text) => setSelectedValues({ ...selectedValues, taxOnAmountToRefund: text })}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, marginBottom: 10 }}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, selectedValues.brand ? styles.checkboxChecked : null]}>
              {selectedValues.brand && <AntDesign name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.rememberMe}>Refund Full Amount</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20 }}></View>

        <TouchableOpacity style={styles.loginButton} onPress={handleContinue}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reason for Refund</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Feather name='x' size={22} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={modalData}
              renderItem={renderModalItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    left: 10
  },
  backButtonText: {
    fontSize: 18,
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
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Medium'
  },
  closeButton: {
    padding: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Regular'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    padding: 10,
    width: '91%',
    alignSelf: 'center',
    borderRadius: 7,
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 15,
    fontFamily: 'Regular',
    color: '#666',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    fontFamily: 'Medium'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  rememberMe: {
    fontSize: 15,
    fontFamily: 'Regular',
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Medium',
    color: '#fff',
  },
});

export default RefundInformation;

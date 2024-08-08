import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RequestPayment: React.FC = () => {
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handlePriceChange = (input: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = input.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  const validateAmount = () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateAmount()) {
      const createdDate = new Date().toISOString();
      router.push({
        pathname: 'Summary',
        params: { amount, createdDate },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -35, gap: 80, marginBottom: 20 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Request Payment</Text>
      </View>

      <Text style={styles.withdrawalText}>Withdrawal Amount</Text>
      <Text style={styles.description}>
        Specify the amount you wish to withdraw from your balance. Review the details before submitting your request.
        Payments will be processed according to the schedule and terms.
      </Text>

      <View style={styles.amountContainer}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          keyboardType="numeric"
          onChangeText={handlePriceChange}
          placeholder="0"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 100,
    paddingHorizontal: 10,
  },
  dollarSign: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 8,
  },
  nextButton: {
    backgroundColor: '#FF8c00',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  withdrawalText: {
    fontSize: 18,
    fontFamily: 'Bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 24,
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
});

export default RequestPayment;

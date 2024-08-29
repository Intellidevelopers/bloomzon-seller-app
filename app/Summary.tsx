import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Summary: React.FC = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const amount = Array.isArray(params.amount) ? params.amount[0] : params.amount;
    const createdDate = Array.isArray(params.createdDate) ? params.createdDate[0] : params.createdDate;
  
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

  return (
    <View style={styles.container}>
       <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-between"}}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Summary</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Review Your Request</Text>
      <Text style={styles.subtitle}>
        Please review the details of your payment request before finalizing. Once confirmed, your request will be processed according to the schedule.
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Date Created</Text>
          <Text style={styles.summaryValue}>{formatDate(createdDate)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.summaryValue}>${amount}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Account ending</Text>
          <Text style={styles.summaryValue}>724</Text>
        </View>
      </View>

      <View style={styles.info}>
        <AntDesign name="infocirlceo" color={'#666'} size={20} /> 
        <Text style={styles.infoText}>The transfer amount may be different than the balance shown.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/SuccessComponent')}>
          <Text style={styles.confirmButtonText}>Confirm Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Semibold',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '90%'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 2,
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#FF8c00',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center"
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  info:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
});

export default Summary;

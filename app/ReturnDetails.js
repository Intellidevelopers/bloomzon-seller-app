import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ReturnDetails = () => {
  const route = useRoute();
  const { returnDetails } = route.params;
  const router = useRouter();

  const navigateToRefundInformation = () => {
    router.push({
      pathname: '/RefundInformation',
      params: { returnDetails },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Returns Details</Text>
      </View>

      <View style={styles.returnItem}>
        <View style={styles.returnHeader}>
          <Text style={styles.orderId}>Order ID: {returnDetails.id}</Text>
          <Text style={styles.date}>{returnDetails.date}</Text>
        </View>
        <View style={styles.returnContent}>
          <Image source={returnDetails.image} style={styles.returnImage} />
          <View style={styles.returnDetails}>
            <Text style={styles.title}>{returnDetails.title}</Text>
            <Text style={styles.sku}>SKU: <Text style={{color: "#666", fontWeight: "400"}}>{returnDetails.sku}</Text></Text>
            <Text style={styles.reason}>Reason: <Text style={{color: "#666", fontWeight: "400"}}>{returnDetails.reason}</Text></Text>
          </View>
        </View>

        <View style={{padding: 10}}>
          <View style={{borderBottomWidth: 1, borderBottomColor: "#ddd", marginBottom: 25}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20}}>
              <Text style={styles.label}>Approved Date:</Text>
              <Text style={styles.value}>{returnDetails.approved}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20}}>
              <Text style={styles.label}>Return Quantity:</Text>
              <Text style={styles.value}>{returnDetails.quantity}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20}}>
              <Text style={styles.label}>Buyer Name:</Text>
              <Text style={styles.value}>{returnDetails.buyername}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20}}>
              <Text style={styles.label}>Buyer Comment:</Text>
              <Text style={styles.value}>{returnDetails.comment}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-around", gap: 10}}>
            <TouchableOpacity style={styles.contactButton} onPress={() => router.push('/ContactBuyer')}>
              <Text style={styles.contactbuttonText}>Contact Buyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refundButton} onPress={navigateToRefundInformation}>
              <Text style={styles.buttonText}>Process Refund</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },

  label: {
    fontFamily: 'Regular',
  },
  value: {
    fontFamily: "Semibold"
  },
  contactButton: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  refundButton: {
    backgroundColor: '#ff9800',
    borderRadius: 8,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
  },
  contactbuttonText: {
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    gap: 10,
    marginBottom: 20
  },
  backButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    left: -15
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Semibold",
    marginLeft: 20,
    color: '#000',
  },
  returnItem: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    height: '60%',

  },
  returnHeader: {
    padding: 10,
    backgroundColor: '#eee',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnContent: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10
  },
  returnImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 10
  },
  returnDetails: {
    flex: 1,
    marginBottom: 10
  },
  orderId: {
    fontWeight: 'bold',
  },
  date: {
    color: '#777',
  },
  title: {
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  sku: {
    color: '#000',
    fontWeight: '700'
  },
  reason: {
    color: '#000',
    marginTop: 4,
    fontWeight: '700'
  },
});

export default ReturnDetails;

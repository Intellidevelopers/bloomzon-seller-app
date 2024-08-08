import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

// Message data
const message = [
  {
    id: '1',
    name: 'Stephen',
    orderId: '#B341446',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'August 5, 2024',
    quantity: '10',
    purchasedate: 'August 8, 2024',
    shipBy: 'August 8, 2024',
    delivered: 'August 8, 2024',
    carrier: 'ATS',
    trackingNumber: '567890476',
    status: 'sent',
    productName: 'Essential Casual Orange Basic Short Sleeve Tee',
    productID: '89465026',
    productPrice: '100.00'
  },
  {
    id: '2',
    name: 'Josiah',
    orderId: '#B34148989',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'February 5, 2024',
    quantity: '20',
    purchasedate: 'February 8, 2024',
    shipBy: 'February 8, 2024',
    delivered: 'February 8, 2024',
    carrier: 'Airpeace',
    trackingNumber: '567890476',
    status: 'sent',
    productName: 'Casual Orange Basic Short Sleeve Tee',
    productID: '89465026',
    productPrice: '200.00'
  },
  {
    id: '3',
    name: 'Mary',
    orderId: '#B34147678',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'March 5, 2024',
    quantity: '30',
    purchasedate: 'March 6, 2024',
    shipBy: 'March 6, 2024',
    delivered: 'March 6, 2024',
    carrier: 'FEDex',
    trackingNumber: '5678978876',
    status: 'sent',
    productName: 'Orange Basic Short Sleeve Tee',
    productID: '894654426',
    productPrice: '300.00'
  },
  {
    id: '4',
    name: 'Olamide',
    orderId: '#B79001446',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'April 5, 2024',
    quantity: '40',
    purchasedate: 'April 5, 2024',
    shipBy: 'April 8, 2024',
    delivered: 'April 8, 2024',
    carrier: 'GIG',
    trackingNumber: '5678903344',
    status: 'sent',
    productName: 'Short Sleeve Tee',
    productID: '89465026',
    productPrice: '400.00'
  },
  // ...other messages
];

const messages = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => {
        navigation.navigate('ChatScreen', {
          name: item.name,
          message: item.message,
          orderId: item.orderId,
          quantity: item.quantity,
          purchaseDate: item.purchasedate,
          shipBy: item.shipBy,
          delivered: item.delivered,
          carrier: item.carrier,
          trackingNumber: item.trackingNumber,
          status: item.status,
          productName: item.productName,
          productPrice: item.productPrice,
          productID: item.productID
        });
      }}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  const renderDateSeparator = (date) => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 85, marginTop: -20, position: "static" }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>All Messages</Text>
      </View>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        data={message}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {(index === 0 || message[index - 1].date !== item.date) && renderDateSeparator(item.date)}
            {renderItem({ item })}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -24, // Adjust based on the back button size
  },
  dateSeparator: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Bold',
  },
  orderId: {
    fontSize: 14,
    color: '#000',
    fontFamily: "Medium"
  },
  message: {
    fontSize: 13,
    color: '#666',
    fontFamily: "Regular"
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
});

export default messages;

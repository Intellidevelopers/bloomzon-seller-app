import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const AllReturns = ({ navigation, returns }) => {
  return (
    <SafeAreaView style={styles.returnsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {returns.map((item, index) => (
        <Pressable key={index} style={styles.returnItem} onPress={() => navigation.navigate('ReturnDetails', { returnDetails: item })}>
          <View style={styles.returnHeader}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.returnContent}>
            <Image source={item.image} style={styles.returnImage} />
            <View style={styles.returnDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sku}>SKU: <Text style={{color: "#666", fontWeight: "400"}}>{item.sku}</Text></Text>
              <Text style={styles.reason}>Reason: <Text style={{color: "#666", fontWeight: "400"}}>{item.reason}</Text></Text>
            </View>
          </View>
        </Pressable>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    returnsContainer: {
    flex: 1,
    padding: 16,
    width: SCREEN_WIDTH
  },
  returnItem: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
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
  },
  returnImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 10
  },
  returnDetails: {
    flex: 1,
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
    fontWeight: "700"
  },
  reason: {
    color: '#000',
    marginTop: 4,
    fontWeight: "700"
  },
})

export default AllReturns;

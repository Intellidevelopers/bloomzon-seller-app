import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CouponDetails = () => {

    function setActiveTab(arg0: number) {
        throw new Error('Function not implemented.');
    }

    const router = useRouter();

    const handleEditButtonPress = () => {
        // Navigate to the CreateCoupon screen and specify the tab to be selected
        router.push('/CreateCoupon?screen=Tab2');
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupon Details</Text>
        <TouchableOpacity style={styles.backButton2} onPress={() => router.back()}>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>

        <View style={styles.flashDealContainer}>
            <View style={styles.flashDealHeader}>
                <Text style={styles.flashDealLabel}>Save 3% on ORANGE-SHIRT-WOMEN</Text>
            </View>
            <View style={styles.dealContent}>
                <Image source={require('../assets/products/img14.jpg')} style={styles.productImage} />
                <View style={styles.dealDetails}>
                    <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
                     <Text style={styles.productPrice}>$500</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.dealDuration}>SKU: <Text style={{fontFamily: "Regular", color: "#777"}}>ORANGE-SHIRT-WOMEN</Text></Text>
                    </View>
                </View>
            </View>
          <View style={{marginBottom: 20}}></View>
            <View style={styles.summary}>
            <View>
            <Text style={styles.orderDetail}>Date</Text>
            <Text style={styles.orderDetail}></Text>
            </View>
            <View style={{flexDirection: "column", alignItems: "flex-end", alignContent: "center",}}>
            <Text style={styles.orderDetailValue}>29/07/2024 - 04/08/2024</Text>
            <Text style={{color: "#777"}}>12:00 AM - 11:45 PM PST</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Status </Text>
            <View style={{backgroundColor: "#ecf6eb", paddingHorizontal: 25, padding: 4, alignItems: "center", borderRadius: 10}}>
              <Text style={styles.dealStatus}>Active</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Discount</Text>
            <Text style={styles.orderDetailValue}>10%</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Budget</Text>
            <Text style={styles.orderDetailValue}>$200</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Sales</Text>
            <Text style={styles.orderDetailValue}>$3,500</Text>
          </View>

          <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20}}></View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.deactivateButton}>
                        <Feather name="power" size={20} color="red" />
                    <Text style={styles.createDealButtonText}> Deactivate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
                        <SimpleLineIcons name="pencil" size={20} color="#000" />
                        <Text style={styles.editDealButtonText}> Edit</Text>
                    </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
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
    paddingTop: 35,
    paddingBottom: 10,
    gap: 10,
    justifyContent: "space-between",
    backgroundColor: '#fff',
    zIndex: 10,
  },
  headText: {
    fontSize: 18,
    fontFamily: "Semibold",
    color: '#000',
  },
  backButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton2: {
    backgroundColor: "#fff",
    padding: 26,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Semibold",
    color: '#000',
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 175,
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  filterText: {
    fontSize: 14,
    marginRight: 5,
    color: "#666",
  },
  statsContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    height: 80,
    width: 140,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Semibold',
  },
  statLabel: {
    color: '#00d1a3',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    width: '109%',
    alignSelf: "center"
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 15
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Add some padding to avoid the button overlap
  },
  flashDealsText: {
    fontSize: 18,
    fontFamily: 'Semibold',
    marginBottom: 10,
  },
  flashDealContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 60,
  },
  flashDealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee', // Background color for the label
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '107%',
    alignSelf: "center",
    top: -10
  },
  flashDealLabel: {
    fontSize: 15,
    fontFamily: 'Semibold',
    color: '#000',
    marginLeft: 5,
  },
  dealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20
  },
  productImage: {
    width: 90,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  dealDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: 'Semibold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Bold',
    color: '#000',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#777',
    fontSize: 14,
  },
  dealDuration: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontFamily: 'Semibold',

  },
  dealStatus: {
    fontSize: 14,
    color: '#4caf50',
    fontFamily: "Regular"
  },
  createDealButton: {
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 20
  },
  createDealButtonText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: 'red',
  },
  editDealButtonText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: '#000',
  },
  divider:{
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  orderDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
    fontWeight: "400"

  },
  orderDetailValue: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "700"
  },
  buttons:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deactivateButton:{
    borderWidth: 2,
    paddingHorizontal: 23,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15

  },
  editButton:{
    borderWidth: 1,
    paddingHorizontal: 48,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15
  }
});

export default CouponDetails;

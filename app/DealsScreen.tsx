import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Modal } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DealsScreen = () => {
  const handleMonthSelect = (month: React.SetStateAction<string>) => {
    setSelectedMonth(month);
    setDropdownVisible(false);
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('6 months');


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deals</Text>
        <TouchableOpacity style={styles.backButton2} onPress={() => router.back()}>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.filterHeader}>
          <Text style={styles.headText}>Deals</Text>
          <TouchableOpacity style={styles.filterContainer} onPress={() => setDropdownVisible(true)}>
            <Text style={styles.filterText}>{selectedMonth}</Text>
            <AntDesign name="down" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.statsContainer} horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Sales</Text>
            <Text style={styles.statValue}>$3,500</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Unit Sold</Text>
            <Text style={styles.statValue}>7</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Views</Text>
            <Text style={styles.statValue}>2,134</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Conversion rate</Text>
            <Text style={styles.statValue}>10%</Text>
          </View>
        </ScrollView>

        <View style={{backgroundColor: "#eee", height: 10, marginBottom: 20}}></View>


        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={22} color="#777" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Search..." />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.flashDealsText}>Flash Deals</Text>

        <TouchableOpacity onPress={() => router.push('/DealsDetails')}>
        <View style={styles.flashDealContainer}>
          <View style={styles.flashDealHeader}>
            <Feather name="zap" size={16} color="#ff8c00" />
            <Text style={styles.flashDealLabel}>Flash Deal</Text>
          </View>
          <View style={styles.dealContent}>
            <Image source={require('../assets/products/img19.jpg')} style={styles.productImage} />
            <View style={styles.dealDetails}>
              <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
              <Text style={styles.productPrice}>$500 <Text style={styles.originalPrice}>$560</Text></Text>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.dealDuration}>7 days deal</Text>
              <View style={{backgroundColor: "#ecf6eb", paddingHorizontal: 25, padding: 4, alignItems: "center", borderRadius: 10}}>
              <Text style={styles.dealStatus}>Active</Text>
              </View>
              </View>
            </View>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/DealsDetails')}>
        <View style={styles.flashDealContainer}>
          <View style={styles.flashDealHeader}>
            <Feather name="zap" size={16} color="#ff8c00" />
            <Text style={styles.flashDealLabel}>Flash Deal</Text>
          </View>
          <View style={styles.dealContent}>
            <Image source={require('../assets/products/img6.jpg')} style={styles.productImage} />
            <View style={styles.dealDetails}>
              <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
              <Text style={styles.productPrice}>$500 <Text style={styles.originalPrice}>$560</Text></Text>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.dealDuration}>7 days deal</Text>
              <View style={{backgroundColor: "#ecf6eb", paddingHorizontal: 25, padding: 4, alignItems: "center", borderRadius: 10}}>
              <Text style={styles.dealStatus}>Active</Text>
              </View>
              </View>
            </View>
          </View>
        </View>
        </TouchableOpacity>

       <TouchableOpacity onPress={() => router.push('/DealsDetails')}>
       <View style={styles.flashDealContainer}>
          <View style={styles.flashDealHeader}>
            <Feather name="zap" size={16} color="#ff8c00" />
            <Text style={styles.flashDealLabel}>Flash Deal</Text>
          </View>
          <View style={styles.dealContent}>
            <Image source={require('../assets/products/img14.jpg')} style={styles.productImage} />
            <View style={styles.dealDetails}>
              <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
              <Text style={styles.productPrice}>$500 <Text style={styles.originalPrice}>$560</Text></Text>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.dealDuration}>7 days deal</Text>
              <View style={{backgroundColor: "#ecf6eb", paddingHorizontal: 25, padding: 4, alignItems: "center", borderRadius: 10}}>
              <Text style={styles.dealStatus}>Active</Text>
              </View>
              </View>
            </View>
          </View>
        </View>
       </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={styles.createDealButton} onPress={() => router.push('/CreateDeal')}>
            <Feather name="plus" size={24} color="#fff" />
        <Text style={styles.createDealButtonText}> Create New Deal</Text>
      </TouchableOpacity>

      <Modal visible={isDropdownVisible} transparent animationType="slide">
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
                      <View style={styles.modalContent}>
                        {['Last 7 days', 'Last month', 'Last 6 months', 'Last year'].map((month) => (
                          <TouchableOpacity key={month} style={styles.dropdownItem} onPress={() => handleMonthSelect(month)}>
                            <Text>{month}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </Modal>
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
    marginBottom: 20,
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
    fontSize: 16,
    fontFamily: 'Semibold',
    color: '#000',
    marginLeft: 5,
  },
  dealContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Medium',

  },
  dealStatus: {
    fontSize: 14,
    color: '#4caf50',
    fontFamily: "Medium"
  },
  createDealButton: {
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
    flexDirection: "row",
  },
  createDealButtonText: {
    fontSize: 16,
    fontFamily: 'Regular',
    color: '#fff',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
});

export default DealsScreen;

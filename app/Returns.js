import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import AllReturns from './AllReturns';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const Returns = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Returns');

  const returns = [
    {
      id: '#B341446',
      date: '29/07/2024',
      image: require('../assets/products/img14.jpg'),
      title: 'Essential Casual Orange Basic Short Sleeve Tee',
      sku: 'ORANGE-SHIRT-WOMEN',
      reason: 'Wrong item was sent',
      approved: '31/07/2024',
      quantity: '2',
      buyername: 'Engr Femi Vanzekins',
      comment: 'This shoe is not my size',
      status: 'completed'
    },
    {
      id: '#B341957',
      date: '28/07/2024',
      image: require('../assets/products/img9.jpg'),
      title: 'Trendy Black Print Casual Graphic T-Shirt',
      sku: 'BLACK-SHIRT-WOMEN',
      reason: 'Damaged Product',
      approved: '30/07/2024',
      quantity: '10',
      buyername: 'Adeagbo Josiah',
      comment: 'I dont like the material',
      status: 'pending'
    },
    {
      id: '#B341446',
      date: '29/07/2024',
      image: require('../assets/products/img10.jpg'),
      title: 'Essential Casual Orange Basic Short Sleeve Tee',
      sku: 'ORANGE-SHIRT-WOMEN',
      reason: 'Wrong item was sent',
      approved: '31/07/2024',
      quantity: '2',
      buyername: 'Engr Femi Vanzekins',
      comment: 'This shoe is not my size',
      status: 'completed'
    },
    {
      id: '#B341957',
      date: '28/07/2024',
      image: require('../assets/products/img5.jpg'),
      title: 'Trendy Black Print Casual Graphic T-Shirt',
      sku: 'BLACK-SHIRT-WOMEN',
      reason: 'Damaged Product',
      approved: '30/07/2024',
      quantity: '10',
      buyername: 'Adeagbo Josiah',
      comment: 'I dont like the material',
      status: 'pending'
    },
    {
      id: '#B341446',
      date: '29/07/2024',
      image: require('../assets/products/img13.jpg'),
      title: 'Essential Casual Orange Basic Short Sleeve Tee',
      sku: 'ORANGE-SHIRT-WOMEN',
      reason: 'Wrong item was sent',
      approved: '31/07/2024',
      quantity: '2',
      buyername: 'Engr Femi Vanzekins',
      comment: 'This shoe is not my size',
      status: 'completed'
    },
    {
      id: '#B341957',
      date: '28/07/2024',
      image: require('../assets/products/img7.jpg'),
      title: 'Trendy Black Print Casual Graphic T-Shirt',
      sku: 'BLACK-SHIRT-WOMEN',
      reason: 'Damaged Product',
      approved: '30/07/2024',
      quantity: '10',
      buyername: 'Adeagbo Josiah',
      comment: 'I dont like the material',
      status: 'pending'
    },
    {
      id: '#B341446',
      date: '29/07/2024',
      image: require('../assets/products/img3.jpg'),
      title: 'Essential Casual Orange Basic Short Sleeve Tee',
      sku: 'ORANGE-SHIRT-WOMEN',
      reason: 'Wrong item was sent',
      approved: '31/07/2024',
      quantity: '2',
      buyername: 'Engr Femi Vanzekins',
      comment: 'This shoe is not my size',
      status: 'completed'
    },
    {
      id: '#B341957',
      date: '28/07/2024',
      image: require('../assets/products/img8.jpg'),
      title: 'Trendy Black Print Casual Graphic T-Shirt',
      sku: 'BLACK-SHIRT-WOMEN',
      reason: 'Damaged Product',
      approved: '30/07/2024',
      quantity: '10',
      buyername: 'Adeagbo Josiah',
      comment: 'I dont like the material',
      status: 'pending'
    }
  ];

  const pendingReturns = returns.filter(returnItem => returnItem.status === 'pending');
  const completedReturns = returns.filter(returnItem => returnItem.status === 'completed');

  const renderContent = () => {
    switch (activeTab) {
      case 'All Returns':
        return <AllReturns navigation={navigation} returns={returns} />;
      case 'Pending Returns':
        return <AllReturns navigation={navigation} returns={pendingReturns} />;
      case 'Completed Returns':
        return <AllReturns navigation={navigation} returns={completedReturns} />;
      default:
        return <AllReturns navigation={navigation} returns={returns} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Returns</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name='search' size={22} color='#777' style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name='filter' size={22} color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'All Returns' && styles.activeTab]} onPress={() => setActiveTab('All Returns')}>
          <Text style={[styles.tabText, activeTab === 'All Returns' && styles.activeTabText]}>All Returns</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'Pending Returns' && styles.activeTab]} onPress={() => setActiveTab('Pending Returns')}>
          <Text style={[styles.tabText, activeTab === 'Pending Returns' && styles.activeTabText]}>Pending Returns</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'Completed Returns' && styles.activeTab]} onPress={() => setActiveTab('Completed Returns')}>
          <Text style={[styles.tabText, activeTab === 'Completed Returns' && styles.activeTabText]}>Completed Returns</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: "space-between"
  },
  backButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Semibold",
    marginLeft: 20,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
    marginBottom: 20
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff9800',
  },
  activeTabText: {
    color: '#ff9800',
  },
  returnsContainer: {
    flex: 1,
    padding: 16,
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
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
});

export default Returns;

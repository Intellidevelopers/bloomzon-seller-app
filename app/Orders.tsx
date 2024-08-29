import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import { AntDesign, Feather, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const orders = [
  { id: '1', title: 'Essential Casual Orange Basic Short Sleeve Tee', price: 500, status: 'Pending', orderId: '#B341446', date: 'July 11, 2024', image: require('../assets/products/img2.jpg') },
  { id: '2', title: 'Essential Casual Orange Basic Short Sleeve Tee', price: 500, status: 'Pending', orderId: '#B341446', date: 'July 11, 2024', image: require('../assets/products/img3.jpg') },
  { id: '3', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Processing', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img4.jpg') },
  { id: '4', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Processing', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img5.jpg') },
  { id: '5', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'New Orders', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img6.jpg') },
  { id: '6', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'New Orders', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img7.jpg') },
  { id: '7', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'New Orders', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img8.jpg') },
  { id: '8', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Delivered', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img9.jpg') },
  { id: '9', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Delivered', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img10.jpg') },
  { id: '10', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Delivered', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img11.jpg') },
  { id: '11', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Cancelled', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img12.jpg') },
  { id: '12', title: 'Trendy Black Print Casual Graphic T-Shirt', price: 600, status: 'Cancelled', orderId: '#B341447', date: 'July 11, 2024', image: require('../assets/products/img13.jpg') },
  // Add more orders as needed
];

const Orders: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All Orders');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const toggleMenu = (order: any, event: any) => {
    setSelectedOrder(order);
    setMenuModalVisible(true); // Show menu modal
    setMenuVisible(!menuVisible);

    if (!menuVisible) {
      const { pageX, pageY } = event.nativeEvent;
      setMenuPosition({ x: pageX, y: pageY });
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuModalVisible(false); // Close the menu modal
  };


    const renderOrderItem = ({ item }: any) => (
      <View style={styles.orderItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.orderTextContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <TouchableOpacity onPress={(event) => toggleMenu(item, event)}>
            <Feather name='more-horizontal' size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.orderPrice}>${item.price}</Text>
        <Text style={styles.orderDetails}>{item.orderId} · {item.date}</Text>
        <View style={styles.orderStatut}>
          <Text
            style={[
              styles.orderStatus,
              item.status === 'Cancelled' && styles.statusCancelled,
              item.status === 'Pending' && styles.statusPending,
              item.status === 'Delivered' && styles.statusDelivered,
              item.status === 'Processing' && styles.statusProcessing,
              item.status === 'New Orders' && styles.statusNewOrders,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
    );
    

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center",justifyContent: "space-between", marginTop: -30 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Manage Orders</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
            <Feather name='search' size={22} color='#777' style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Search..." />
          </View>
          <TouchableOpacity style={styles.filterIcon}>
            <FontAwesome5 name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

      <View style={styles.viewBloomzonButton}>
        <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", left: 140 }}>
                <Text style={styles.viewBloomzonText}>View Bloomzon Ship Orders</Text>
                <AntDesign name="right" size={15} color="#00D1A3" />
            </View>
        </TouchableOpacity>
      </View>

      <Text style={{ fontFamily: "Semibold", fontSize: 18, marginBottom: 10, padding: 10 }}>Manage Orders</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusItem, { backgroundColor: '#E3E8FF' }]}>
          <Text style={styles.statusText}>Pending</Text>
          <Text style={styles.statusNumber}>30</Text>
        </View>
        <View style={[styles.statusItem, { backgroundColor: '#FCE9D8' }]}>
          <Text style={styles.statusText}>Processing</Text>
          <Text style={styles.statusNumber}>15</Text>
        </View>
        <View style={[styles.statusItem, { backgroundColor: '#E1FAF1' }]}>
          <Text style={styles.statusText}>Delivered</Text>
          <Text style={styles.statusNumber}>1,620</Text>
        </View>
        <View style={[styles.statusItem, { backgroundColor: '#FFE3E3' }]}>
          <Text style={styles.statusText}>Cancelled</Text>
          <Text style={styles.statusNumber}>40</Text>
        </View>
      </View>
      <View>
        <View style={{backgroundColor: "#eee", height: 10, width: '120%', alignSelf: "center"}}></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.tabContainer}>
          {['All Orders', 'New Orders', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabItem, selectedTab === tab && styles.activeTabItem]}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>

      <FlatList
          data={orders.filter(order => selectedTab === 'All Orders' || order.status === selectedTab)}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal Structure */}
        <Modal
          transparent={true}
          visible={menuModalVisible}
          animationType="fade"
          onRequestClose={closeMenu}
        >
          <Pressable style={styles.overlay} onPress={closeMenu}>
            <View style={[styles.menuCard, { top: menuPosition.y - 20, left: menuPosition.x - 200 }]}>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="calendar" size={20} color="#000" />
                <Text style={styles.menuItemText}>Schedule Pickup</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="printer" size={20} color="#000" />
                <Text style={styles.menuItemText}>Print Packing Slip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="closecircleo" size={20} color="red" />
                <Text style={[styles.menuItemText, { color: 'red' }]}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    overflow: "hidden"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    alignSelf: "center"
  },

  searchInput: {
    flex: 1,
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
  filterIcon: {
    backgroundColor: '#F37300',
    padding: 13,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewBloomzonButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#eee",
    padding: 20,
    width: '120%',
    alignSelf: "center",
    flexDirection: "row",
  },
  viewBloomzonText: {
    color: '#00D1A3',
    fontSize: 15
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 5
  },
  statusItem: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 2,
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#000',
    fontSize: 12,
  },
  tabScrollContainer: {
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 15


  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#F37300',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#F37300',
  },
  orderItem: {
    flexDirection: 'row',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  productImage: {
    width: 105,
    height: 120,
    marginRight: 2,
    borderRadius: 8,
    left: -14
  },
  orderTextContainer: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 14,
    fontFamily: 'Semibold',
    width: '80%',
  },
  orderPrice: {
    fontSize: 16,
    color: '#000',
    fontFamily: "Bold"
  },
  orderDetails: {
    color: '#888',
  },
  orderStatus: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    alignSelf: 'flex-start',
    borderRadius: 10,

  },
  orderStatut: {
    borderRadius: 10,
  },
  statusPending: {
    backgroundColor: '#edebff',
    color: "#858dff"
  },
  statusCancelled: {
    backgroundColor: '#ffe9e7',
    color: "red",
    fontWeight: "500"

  },
  statusDelivered: {
    color: '#43a047',
    borderRadius: 5,
    backgroundColor: "#e1efdf",
    fontWeight: "500"


  },
  statusProcessing: {
    backgroundColor: '#ffeddd',
    color: "#f69731",
    fontWeight: "500"
  },
  statusNewOrders: {
    backgroundColor: '#f4e6fd',
    color: "#b26af1"
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  menuCard: {
    position: 'absolute',
    width: '55%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: -10
  },
});

export default Orders;

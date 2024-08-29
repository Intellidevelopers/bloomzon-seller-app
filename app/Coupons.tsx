import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, GestureResponderEvent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Coupons: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('All Coupons');

    const ordersData = [
        {
          id: 1,
          title: 'Essential Casual Orange Basic Short Sleeve Tee',
          price: '500',
          image: require('../assets/products/img19.jpg'),
          orderId: 'ORD123',
          date: '2024-08-12',
          status: 'Active',
          sku: 'Save 10% on ORANGE-SHIRT-WOMEN',
          discount: '20'
  
  
        },
        {
          id: 2,
          title: 'Essential Casual Orange Basic Short Sleeve Tee',
          price: '500',
          image: require('../assets/products/img6.jpg'),
          orderId: 'ORD124',
          date: '2024-08-11',
          status: 'Ended',
          sku: 'Save 5% on ORANGE-SHIRT-WOMEN',
          discount: '15'
  
  
        },
        {
          id: 3,
          title: 'Essential Casual Orange Basic Short Sleeve Tee',
          price: '500',
          image: require('../assets/products/img6.jpg'),
          orderId: 'ORD124',
          date: '2024-08-11',
          status: 'Submitted',
          sku: 'Save 7% on ORANGE-SHIRT-WOMEN',
          discount: '10'
  
        },
        {
          id: 4,
          title: 'Essential Casual Orange Basic Short Sleeve Tee',
          price: '500',
          image: require('../assets/products/img6.jpg'),
          orderId: 'ORD124',
          date: '2024-08-11',
          status: 'Cancelled',
          sku: 'Save 3% on ORANGE-SHIRT-WOMEN',
          discount: '5'
  
        },
        // Add more orders with different statuses
      ];
  
    const filteredOrders = ordersData.filter(order => {
      if (selectedTab === 'All Coupons') {
        return true;
      }
      return order.status === selectedTab;
    });
    
    const renderOrderItem = ({ item }: { item: any }) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case 'Active':
              return styles.statusActive;
            case 'Ended':
              return styles.statusEnded;
            case 'Submitted':
              return styles.statusSubmitted;
            case 'Cancelled':
              return styles.statusCancelled;
            default:
              return styles.statusDefault;
          }
        };

        return (
            <TouchableOpacity onPress={() => router.push('/CouponDetails')}>
                <View style={styles.flashDealContainer}>
                <View style={styles.flashDealHeader}>
                    <Text style={styles.flashDealLabel}>{item.sku}</Text>
                </View>
                <View style={styles.dealContent}>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles.dealDetails}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>
                            ${item.price}
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.dealDuration}>Discount: <Text style={{color: "#666"}}>{item.discount}%</Text></Text>
                            <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
                                <Text style={[styles.statusText, { color: getStatusStyle(item.status).color }]}>{item.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: -30 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name='arrowleft' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Coupons</Text>
                <TouchableOpacity style={styles.backButton2} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.tabContainer}>
                        {['All Coupons', 'Active', 'Cancelled', 'Ended', 'Submitted'].map((tab) => (
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

                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
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
        marginBottom: 40,
      },
      tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap: 15,
        marginBottom: 40,
        borderBottomWidth: 1,
        paddingBottom: -10,
        borderBottomColor: "#eee"

    
    
      },
      tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
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
        fontWeight: "500",
        paddingHorizontal: 25,
        padding: 7,
        borderRadius: 7
    
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
      flashDealsText: {
        fontSize: 18,
        fontFamily: 'Semibold',
        marginBottom: 10,
      },
      flashDealContainer: {
        borderWidth: 2,
        borderColor: '#ddd',
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
        fontSize: 14,
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
        marginBottom: 5,
        fontWeight: "700"
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
        fontWeight: "400"
      },
      dealDuration: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
        fontWeight: "600"
    
      },
      dealStatus: {
        fontSize: 14,
        color: '#4caf50',
        fontWeight: "400"
      },
      dealStatusEnded: {
        fontSize: 14,
        color: 'red',
        fontWeight: "400",
        paddingHorizontal: 25,
        padding: 7,
        borderRadius: 7
      },
        statusActive: {
          backgroundColor: '#ecf6eb',
          color: '#4caf50',
        paddingHorizontal: 25,
        padding: 7,
        borderRadius: 7

        },
        statusEnded: {
          backgroundColor: '#ffe9e7',
          color: 'red',
          paddingHorizontal: 25,
          padding: 7,
          borderRadius: 7
        },
        statusSubmitted: {
          backgroundColor: '#e3f2fd',
          color: '#1e88e5',
          paddingHorizontal: 25,
          padding: 7,
          borderRadius: 7
        },
        statusDefault: {
          backgroundColor: '#f0f0f0',
          color: '#888',
          paddingHorizontal: 25,
          padding: 7,
          borderRadius: 7
        },
});

export default Coupons;
function toggleMenu(item: any, event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
}


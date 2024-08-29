import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

// Message data
const messageData = [
  {
    id: '1',
    name: 'Stephen',
    orderId: '#B34148946',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'August 5, 2024',
    status: 'unread',
    productPrice: '100.00',
    productName: 'Essential Casual Orange Basic Short Sleeve Tee',
    imageUrl: 'https://randomuser.me/api/portraits/men/54.jpg', // Replace with actual image URLs
    isFavorite: true,
    isFollower: false,
    purchasedate: 'August 4, 2024 07:36 PM',
    shipBy: 'July 4, 2024 07:36 PM',
    delivered: 'August 4, 2024 07:36 PM',
    carrier: 'ATS',
    trackingNumber: '647G3782783',
    quantity: '10',
    productID: 'BL588484983'
  },
  {
    id: '2',
    name: 'Josiah',
    orderId: '#B34148989',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'February 5, 2024',
    status: 'received',
    productPrice: '200.00',
    productName: 'Casual Orange Basic Short Sleeve Tee',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    isFavorite: false,
    isFollower: true,
    purchasedate: 'March 4, 2024 07:36 PM',
    shipBy: 'July 4, 2024 07:36 PM',
    delivered: 'March 4, 2024 07:36 PM',
    carrier: 'GIG',
    trackingNumber: '647G34082783',
    quantity: '20',
    productID: 'BL58848083'

  },
  {
    id: '3',
    name: 'Mary',
    orderId: '#B34147678',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'March 5, 2024',
    status: 'archive',
    productPrice: '400.00',
    productName: 'Orange Basic Short Sleeve Tee',
    imageUrl: 'https://randomuser.me/api/portraits/women/83.jpg',
    isFavorite: true,
    isFollower: true,
    purchasedate: 'April 4, 2024 07:36 PM',
    shipBy: 'July 4, 2024 07:36 PM',
    delivered: 'April 4, 2024 07:36 PM',
    carrier: 'FEDex',
    trackingNumber: '647G3783383',
    quantity: '30',
    productID: 'BL58848083'
  },
  {
    id: '4',
    name: 'Olamide',
    orderId: '#B79001446',
    message: 'The item has not arrived as scheduled. Please send...',
    date: 'April 5, 2024',
    status: 'unread',
    productPrice: '500.00',
    productName: 'Short Sleeve Tee',
    imageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
    isFavorite: false,
    isFollower: false,
    purchasedate: 'December 4, 2024 07:36 PM',
    shipBy: 'July 4, 2024 07:36 PM',
    delivered: 'December 4, 2024 07:36 PM',
    carrier: 'PMT',
    trackingNumber: '647G3788783',
    quantity: '50',
    productID: 'BL58848083'
  },
  // ...other messages
];

const messages = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filterMessages = (messages, tab, query) => {
    let filteredMessages = messages;

    if (tab === 'Unread') {
      filteredMessages = filteredMessages.filter((msg) => msg.status === 'unread');
    } else if (tab === 'Archive') {
      filteredMessages = filteredMessages.filter((msg) => msg.status === 'archive');
    } else if (tab === 'Favorite') {
      filteredMessages = filteredMessages.filter((msg) => msg.isFavorite);
    } else if (tab === 'Followers') {
      filteredMessages = filteredMessages.filter((msg) => msg.isFollower);
    }

    if (query) {
      filteredMessages = filteredMessages.filter((msg) =>
        msg.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredMessages;
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
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDateSeparator = (date) => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const tabs = ['All', 'Unread', 'Archive', 'Favorite', 'Followers'];

  const unreadCount = messageData.filter((msg) => msg.status === 'unread').length;

  const filteredMessages = filterMessages(messageData, selectedTab, searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>{selectedTab}</Text>
        <TouchableOpacity style={styles.backButton2} onPress={() => router.push('/SettingScreen')}>
          <AntDesign name='setting' size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name='search' size={22} color='#666' style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterIcon}>
            <FontAwesome5 name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.selectedTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
              {tab === 'Unread' && unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {filteredMessages.length === 0 ? (
          <View style={styles.noResultsWrapper}>
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>User with this name not found</Text>
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View>
                {(index === 0 || filteredMessages[index - 1].date !== item.date) && renderDateSeparator(item.date)}
                {renderItem({ item })}
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom: 20
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    position: 'relative'
  },
  selectedTab: {
    backgroundColor: '#00ac8d',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: -10
  },
  header:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    justifyContent: "space-between"
  },
  selectedTabText:{
    color: "#fff"
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignSelf: "center",
    left: 10
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
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    alignSelf: "center",
  },
  noResultsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'Regular',
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default messages;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6, Ionicons, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const QuickActions = () => {
  const router = useRouter(); // Get the router instance

  // Define your quick action items with icon components
  const actions = [
    { label: 'Add a Product', icon: <FontAwesome6 name='folder-plus' size={30} color='#00D1A3' />, route: '/AddProduct' },
    { label: 'Manage Orders', icon: <Ionicons name='save' size={30} color='#00D1A3' />, route: '/ManageOrders' },
    { label: 'Manage Returns', icon: <FontAwesome6 name='reply-all' size={30} color='#00D1A3' />, route: '/Returns' },
    { label: 'Manage Inventory', icon: <FontAwesome6 name='store' size={30} color='#00D1A3' />, route: '/Inventory' },
    { label: 'Payments', icon: <FontAwesome6 name='credit-card' size={30} color='#00D1A3' />, route: '/Payments' },
    { label: 'Communications', icon: <Entypo name='chat' size={30} color='#00D1A3' />, notificationCount: 2, route: 'Communications' },
    { label: 'Business Analysis', icon: <FontAwesome6 name='chart-simple' size={30} color='#00D1A3' />, route: '/BusinessAnalysis' },
    { label: 'Advertisement', icon: <FontAwesome6 name='chart-simple' size={30} color='#00D1A3' />, route: '/Advertisement' },
    { label: 'Account Health', icon: <MaterialCommunityIcons name='sine-wave' size={30} color='#00D1A3' />, route: '/AccountHealth' },
    { label: 'Coupons', icon: <Ionicons name='pricetags' size={30} color='#00D1A3' />, route: '/Coupons' },
    { label: 'Customer Voice', icon: <MaterialCommunityIcons name='account-voice' size={30} color='#00D1A3' />, route: '/CustomerVoice' },
    { label: 'Subscribe & Save', icon: <FontAwesome5 name='sync-alt' size={30} color='#00D1A3' />, route: '/SubscribeSave' },
    { label: 'Feedback', icon: <MaterialCommunityIcons name='message-alert' size={30} color='#00D1A3' />, route: '/Feedback' },
    { label: 'Growth Opportunity', icon: <FontAwesome6 name='chart-line' size={30} color='#00D1A3' />, route: '/GrowthOpportunity' },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabsContainer}
          onPress={() => router.push(action.route)}
        >
          <View style={styles.tabContent}>
            <View style={{ marginBottom: 10 }}>{action.icon}</View>
            <Text style={styles.tabText}>{action.label}</Text>
            {action.notificationCount ? (
              <View style={styles.notification}>
                <Text style={styles.notificationText}>{action.notificationCount}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  tabsContainer: {
    borderWidth: 2,
    padding: 30,
    borderRadius: 10,
    borderColor: "#ddd",
    width: (width / 2) - 20,
    marginVertical: 10,
  },
  tabContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: "Regular",
    color: "#333",
    textAlign: "center",
    width: 150,
    fontSize: 13,
  },
  notification: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default QuickActions;

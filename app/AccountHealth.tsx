// AccountHealth.tsx

import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const AccountHealth = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Health</Text>
      </View>
     <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
     <View style={styles.content}>
        <Text style={styles.title}>Account Health</Text>
        <Text style={styles.description}>
          Track your account's performance and status with key metrics and alerts. Ensure compliance and maintain a healthy account with real-time updates.
        </Text>
        <View style={styles.healthIndicatorContainer}>
          <Text style={styles.healthPercentage}>98%</Text>
          <View style={styles.healthStatusButton}>
            <Text style={styles.healthStatusText}>Healthy</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Product Policy Compliance</Text>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Received Intellectual Property Complaints</Text>
          <Text style={styles.complianceItemValue}>0</Text>
          <Text style={styles.complianceItemTarget}>Target: 0 complaints</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Product Authenticity Customer Complaints</Text>
          <Text style={styles.complianceItemValue}>0</Text>
          <Text style={styles.complianceItemTarget}>Target: 0 complaints</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Product Condition Customer Complaints</Text>
          <Text style={styles.complianceItemValue}>0</Text>
          <Text style={styles.complianceItemTarget}>Target: 0 complaints</Text>
        </View>
        <View style={styles.complianceItem}>
          <Text style={styles.complianceItemTitle}>Listing Policy Violations</Text>
          <Text style={styles.complianceItemValue}>0</Text>
          <Text style={styles.complianceItemTarget}>Target: 0 complaints</Text>
          {/* Add more items here as needed */}
        </View>
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    width: SCREEN_WIDTH
  },
 
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
    fontFamily: "Regular"
  },
  healthIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: "#96f4b3",
    justifyContent: "space-around",
    padding: 10,
    width: '120%',
    alignSelf: "center",
    gap: 50
  },
  healthPercentage: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  healthStatusButton: {
    backgroundColor: '#26a64d',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginLeft: 10,
  },
  healthStatusText: {
    color: '#fff',
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "#000"
  },
  complianceItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#ddd"
  },
  complianceItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  complianceItemValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  complianceItemTarget: {
    fontSize: 12,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
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
    fontFamily: "Bold",
    marginLeft: 20,
    color: '#000',
  },
});

export default AccountHealth;

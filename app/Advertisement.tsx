import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const Advertisement = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advertisement</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <MaterialCommunityIcons name='brightness-percent' size={30} color='#00D1A3' style={{ marginBottom: 10 }} />
                <Text style={styles.tabText}>Deals</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6 name='lemon' size={30} color='#00D1A3' style={{ marginBottom: 10 }} />
                <Text style={styles.tabText}>Coupons</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <Text style={{fontFamily: "Bold", color: "#00d1a3", fontSize: 20}}>ELITE</Text>
                <Text style={styles.tabText}>Elite Discounts</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <Ionicons name='megaphone' size={30} color='#00D1A3' style={{ marginBottom: 10 }} />
                <Text style={styles.tabText}>Promotions</Text>
              </View>
            </TouchableOpacity>
          </View>
          
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    width: SCREEN_WIDTH
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    height: 150,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  charLimit: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  sendButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 5,
    marginTop: '85%',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    gap: 10,
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
    fontFamily: "Semibold",
    marginLeft: 20,
    color: '#000',
  },
  tabsContainer: {
    borderWidth: 2,
    padding: 25,
    borderRadius: 10,
    borderColor: "#ddd",
    width: 160,
    
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
    fontSize: 13
  },
});

export default Advertisement;

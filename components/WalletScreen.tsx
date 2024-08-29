import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WalletScreen: React.FC = () => {
  return (
    <View style={styles.container}>
                {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-between"}}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name='arrowleft' size={22} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Payments</Text>
            <TouchableOpacity style={styles.backButton2}>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.totalBalance}>Total Balance</Text>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <Text style={styles.balanceAmount}>$310.50</Text>
            <SimpleLineIcons name='arrow-right' size={16} color='#000' />
          </View>
          <Text style={styles.nextPayment}>Next payment is on <Text style={{fontFamily: "Bold"}}>08/12/2024</Text></Text>
        </View>
        <TouchableOpacity style={styles.requestPaymentButton} onPress={() => router.push('/Request')}>
            <Text style={styles.requestPaymentText}>Request Payment</Text>
          </TouchableOpacity>

        {/* Recent Payouts */}
        <View style={styles.recentPayoutsHeader}>
          <Text style={styles.recentPayoutsTitle}>Recent Payouts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.payoutCard}>
          <Text style={styles.payoutAmount}>$210.45</Text>
          <Text style={styles.payoutDate}>Initiated Aug 04, 2024</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.payoutFrequencyContainer}>
                <AntDesign name='calendar' size={16} color='#000' />
                <Text style={styles.payoutFrequency}>Weekly payment</Text>
            </View>
            <SimpleLineIcons name='arrow-right' size={16} color='#000' />
          </View>
        </View>
        <View style={styles.payoutCard}>
            <Text style={styles.payoutAmount}>$324.15</Text>
            <Text style={styles.payoutDate}>Initiated Jul 14, 2024</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.payoutFrequencyContainer}>
                <AntDesign name='calendar' size={16} color='#000' />
                <Text style={styles.payoutFrequency}>Weekly payment</Text>
            </View>
            <SimpleLineIcons name='arrow-right' size={16} color='#000' />
          </View>
        </View>

        {/* Options */}
        <TouchableOpacity style={[styles.optionContainer, styles.option1]}>
          <View style={styles.optionIconContainer}>
            <MaterialCommunityIcons name='credit-card-check' size={18} color='#00D1A3' />
          </View>
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.optionIconContainer}>
            <Entypo name='help-with-circle' size={24} color='#00D1A3' />
          </View>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#FFEDE6',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    paddingVertical: 30
  },
  totalBalance: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Semibold'
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#FF6600',
  },
  nextPayment: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
    fontFamily: "Regular"
  },
  requestPaymentButton: {
    backgroundColor: '#FF6600',
    borderRadius: 40,
    paddingVertical: 18,
    paddingHorizontal: 10,
    width: '55%',
    alignItems: "center",
    alignSelf: "center",
    top: -30,
    borderWidth: 7,
    borderColor: "#fff",
    marginBottom: -40
  },
  requestPaymentText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Regular",
  },
  recentPayoutsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  recentPayoutsTitle: {
    fontSize: 18,
    fontFamily: 'Bold',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6600',
  },
  payoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  payoutAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  payoutDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  payoutFrequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: "#e5e5e5",
    width: '50%',
    padding: 10,
    borderRadius: 7
  },
  payoutFrequency: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionIconContainer: {
    backgroundColor: '#E6F5FF',
    borderRadius: 100,
    padding: 11,
    marginRight: 16,
    paddingVertical: 10
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  option1:{
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
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

export default WalletScreen;

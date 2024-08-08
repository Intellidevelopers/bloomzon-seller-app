import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import CommunicationHeader from '@/components/CommunicationHeader';

const { width } = Dimensions.get('window');

const Communications = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* CommunicationHeader */}
      <CommunicationHeader/>

      {/* Buyer Seller Messages Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.section]}>
        <Text style={styles.sectionTitle}>Buyer Seller Messages</Text>
        <View style={styles.card}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/messages')}>
          <View style={styles.row}>
            <Text style={styles.itemText}>All Messages</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/AllMessages')}>
          <View style={styles.row}>
            <Text style={styles.itemText}>Received Messages</Text>
            <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
            <AntDesign name="right" size={12} color="#fff" style={styles.badgeArrow} />
          </View>
          </View>
          </TouchableOpacity>

         <TouchableOpacity onPress={() => router.push('/')}>
         <View style={styles.row}>
            <Text style={styles.itemText}>Sent Messages</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => router.push('/')}>
         <View style={styles.row2}>
            <Text style={styles.itemText}>Archived</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
         </TouchableOpacity>
        </View>
        </View>

      {/* Support Section */}
      <View style={[styles.section]}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
        <View style={styles.rowSupport}>
            <Text style={styles.itemText}>Caselogs</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={[styles.section]}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => router.push('/Update')}>
          <View style={styles.row}>
            <Text style={styles.itemText}>Updates</Text>
            <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
            <AntDesign name="right" size={12} color="#fff" style={styles.badgeArrow} />
          </View>
          </View>
          </TouchableOpacity>

         <TouchableOpacity onPress={() => router.push('/')}>
         <View style={styles.row}>
            <Text style={styles.itemText}>Orders</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
         </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')}>
          <View style={styles.row2}>
            <Text style={styles.itemText}>Account</Text>
            <AntDesign name="right" size={16} color="#333" />
          </View>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  border: {
    borderRadius: 10,
    padding: 10,
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  notificationBadge: {
    backgroundColor: 'red',
    borderRadius: 12,
    width: 36,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
  },
  badgeArrow: {
    marginLeft: 4,
  },

  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    paddingVertical: 20,
  },
  row2:{
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: '#ddd',
    padding: 10,
    paddingVertical: 20,
  },
  card:{
    borderRadius: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowSupport:{
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%',

  }
});

export default Communications;

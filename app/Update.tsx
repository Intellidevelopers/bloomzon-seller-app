import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type Message = {
  id: string;
  name: string;
  message: string;
  date: string;
};

const messages: Message[] = [
  { id: '1', name: 'You\'re eligible to receive loan offers', message: 'You\'re eligible to receive loan offers that suit your financial needs. Browse through the options...', date: 'August 5, 2024' },
  { id: '2', name: 'You\'re eligible to receive loan offers', message: 'You\'re eligible to receive loan offers that suit your financial needs. Browse through the options...', date: 'August 5, 2024' },
  { id: '3', name: 'You\'re eligible to receive loan offers', message: 'You\'re eligible to receive loan offers that suit your financial needs. Browse through the options...', date: 'August 4, 2024' },
  { id: '4', name: 'You\'re eligible to receive loan offers', message: 'You\'re eligible to receive loan offers that suit your financial needs. Browse through the options...', date: 'August 4, 2024' },

];

const Update: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageContainer} onPress={() => {/* Navigate to message detail */}}>
      <View style={{padding: 10}}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.message}</Text>
      </View>
      <AntDesign name="right" size={20} color="#333" />
    </TouchableOpacity>
  );

  const renderDateSeparator = (date: string) => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style={{ flexDirection: "row", alignItems: "center", gap: 120, marginTop: -20, position: "static" }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Updates</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {(index === 0 || messages[index - 1].date !== item.date) && renderDateSeparator(item.date)}
            {renderItem({ item })}
          </View>
        )}
      />
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -24, // Adjust based on the back button size
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"

  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  orderId: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: "500"
  },
  message: {
    fontSize: 15,
    color: '#666',
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
});

export default Update;

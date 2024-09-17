import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMymessagesQuery } from "@/redux/ApiSlice";
import { ProductsContext } from "@/constants/ProductsData";

type Message = {
  id: string;
  name: string;
  orderId: string;
  message: string;
  date: string;
};

// const messages: Message[] = [
//   { id: '1', name: 'Stephen', orderId: 'B341446', message: 'The item has not arrived as scheduled. Please send...', date: 'August 5, 2024' },
//   { id: '2', name: 'Amber', orderId: 'B341879', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 5, 2024' },
//   { id: '3', name: 'Jayden', orderId: 'B341776', message: 'The item has not arrived as scheduled. Please send...', date: 'August 2, 2024' },
//   { id: '4', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
//   { id: '5', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
//   { id: '6', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
//   { id: '7', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
//   { id: '8', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
//   { id: '9', name: 'Imobighe', orderId: 'B341319', message: 'Package says it was delivered. I\'m looking at the...', date: 'August 2, 2024' },
// ];

const AllMessages: React.FC = () => {
  const { userData } = useContext(ProductsContext);

  const { data } = useMymessagesQuery(1, {
    pollingInterval: 2000,
  });

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState<any>([]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    if (data) {
      setMessage(data);
    }
  }, [data]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => {
        router.push("/ChatScreen");
      }}
    >
      <Text style={styles.name}>
        {userData.name == item.sender_name
          ? item.receiver_name
          : item.sender_name}
      </Text>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>

      {JSON.parse(item.messages)[JSON.parse(item.messages).length - 1].text ? (
        <Text style={styles.message}>
          {JSON.parse(item.messages)[JSON.parse(item.messages).length - 1].text}
        </Text>
      ) : (
        <Text style={styles.message}>Image</Text>
      )}
    </TouchableOpacity>
  );

  const renderDateSeparator = (date: string) => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 85,
          marginTop: -20,
          position: "static",
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>
          All Messages
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {(index === 0 ||
              messages[index - 1].created_at !== item.created_at) &&
              renderDateSeparator(item.created_at.toLocaleString())}
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: -24, // Adjust based on the back button size
  },
  dateSeparator: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  name: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  orderId: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Medium",
  },
  message: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Regular",
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: 10,
  },
});

export default AllMessages;

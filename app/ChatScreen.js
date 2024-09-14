import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Vibration,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import { ProductsContext } from "@/constants/ProductsData";

const ChatScreen = () => {
  const { userData } = useContext(ProductsContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();

  const {
    id,
    name,
    orderId,
    quantity,
    purchaseDate,
    shipBy,
    delivered,
    carrier,
    trackingNumber,
    status,
    productName,
    productPrice,
    productID,
    message,
  } = route.params;

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `https://bloomzon-backend-1-q2ud.onrender.com/api/message_view/${id}`
      );

      const message = JSON.parse(res.data.messages);

      message.reverse();

      setMessages(message);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(messages);
  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(
        `messages_${orderId}`,
        JSON.stringify(newMessages)
      );
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  };

  // Function to simulate auto-reply
  const generateAutoReply = () => {
    return {
      id: Date.now().toString(),
      text: "Thank you for your message! We'll get back to you shortly.",
      timestamp: new Date().toLocaleString(),
      sender: "buyer",
      type: "text",
    };
  };

  //  setInterval(loadMessages, 3000)

  const handleSend = async () => {
    if (inputText.trim()) {
      const message = inputText.trim();

      const data = {
        type: "text",
        text: inputText.trim(),
      };

      try {
        const res = await axios.post(
          `https://bloomzon-backend-1-q2ud.onrender.com/api/send_message/${id}`,
          data
        );
        loadMessages();

        setInputText("");
        // saveMessages(updatedMessages);
        Keyboard.dismiss();
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      } catch (err) {
        console.log(err);
      }

      // const newMessage = {
      //   id: Date.now().toString(),
      //   text: inputText.trim(),
      //   timestamp: new Date().toLocaleString(),
      //   sender: userData.name,
      //   type: "text",
      // };
      // const updatedMessages = [newMessage, ...messages];
      // setMessages(updatedMessages);
      // setInputText("");
      // saveMessages(updatedMessages);
      // Keyboard.dismiss();
      // flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });

      // // Simulate auto-reply after a short delay
      // setTimeout(() => {
      //   const autoReply = generateAutoReply();
      //   const newMessagesWithReply = [autoReply, ...updatedMessages];
      //   setMessages(newMessagesWithReply);
      //   saveMessages(newMessagesWithReply);
      //   flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      // }, 1000); // 1 second delay for simulation
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri;
      const newMessage = {
        image: uri,
        type: "image",
      };
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  // setInterval(loadMessages, 3000);

  const handleLongPress = (message) => {
    Vibration.vibrate(50);
    Alert.alert(
      "Options",
      "Choose an option",
      [
        {
          text: "Delete",
          onPress: async () => {
            const updatedMessages = messages.filter((m) => m.id !== message.id);
            setMessages(updatedMessages);
            await saveMessages(updatedMessages);
          },
        },
        { text: "Archive", onPress: () => console.log("Archived") },
        {
          text: "Copy",
          onPress: () => {
            Clipboard.setString(message.text);
            Alert.alert("Copied", "Message copied to clipboard");
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <Pressable onLongPress={() => handleLongPress(item)}>
      <View
        style={[
          styles.messageContainer,
          item.sender === userData.name
            ? styles.userMessage
            : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.timestamp,
            item.sender === userData.name
              ? styles.userTimestamp
              : styles.otherTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
        {item.text ? (
          <View
            style={
              item.sender === userData.name
                ? styles.userMessageTextContainer
                : styles.otherMessageTextContainer
            }
          >
            <Text
              style={
                item.sender === userData.name
                  ? styles.otherMessageText
                  : styles.userText
              }
            >
              {item.text}
            </Text>
          </View>
        ) : (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      </View>
    </Pressable>
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadMessages();
    setRefreshing(false);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: -20,
            justifyContent: "space-around",
            gap: 50,
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={22} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>
            {name}
          </Text>
          <TouchableOpacity style={styles.infoButton} onPress={toggleModal}>
            <AntDesign name="exclamationcircleo" size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.safetyNote}>
          Keep your account safe - never share personal information in this
          conversation.
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></ScrollView>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF8C00"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={handleImagePick}>
          <Feather name="paperclip" size={22} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={22} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.modalTitle}>Order Details</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <AntDesign name="close" size={22} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Image
              source={require("../assets/products/img4.jpg")}
              style={styles.productImage}
            />
            <View style={{ width: "60%" }}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productPrice}>${productPrice}</Text>
              <Text style={styles.productID}>Product ID: #{productID}</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Quantity:</Text>
            <Text style={styles.orderDetailValue}>{quantity}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Order ID: </Text>
            <Text style={styles.orderDetailValue}>{orderId}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Purchase date:</Text>
            <Text style={styles.orderDetailValue}>{purchaseDate}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Ship by:</Text>
            <Text style={styles.orderDetailValue}>{shipBy}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Delivered by:</Text>
            <Text style={styles.orderDetailValue}>{delivered}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Carrier:</Text>
            <Text style={styles.orderDetailValue}>{carrier}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Tracking number:</Text>
            <Text style={styles.orderDetailValue}>{trackingNumber}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.orderDetail}>Status:</Text>
            <Text style={styles.orderDetailValue}>{status}</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  safetyNote: {
    textAlign: "center",
    padding: 14,
    color: "#666",
    fontSize: 16,
  },
  messageList: {
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: "80%",
    borderRadius: 15,
    paddingBottom: 20,
    left: 6,
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  otherMessage: {
    alignSelf: "flex-start",
  },
  userMessageTextContainer: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#ff8c00",
    padding: 10,
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  otherMessageTextContainer: {
    fontSize: 18,
    color: "#000",
    backgroundColor: "#ffe5cc",
    padding: 10,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  timestamp: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: "right",
  },
  userTimestamp: {
    color: "#000",
  },
  otherTimestamp: {
    color: "#000",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  mediaButton: {
    fontSize: 24,
    color: "#000",
    marginRight: 8,
    backgroundColor: "#eee",
    padding: 18,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#eee",
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    fontSize: 24,
    color: "#FF8C00",
    marginLeft: 8,
    backgroundColor: "#FF8C00",
    padding: 18,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 4,
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
  infoButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    marginTop: -25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  productImage: {
    width: "30%",
    height: 100,
    marginBottom: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "left",
  },
  productPrice: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
    fontWeight: "900",
  },
  productID: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  orderDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  orderDetailValue: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Semibold",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  message: {
    color: "#fff",
    fontSize: 16,
  },
  userText: {
    color: "#000",
  },
  otherMessageText: {
    color: "#fff",
  },
});

export default ChatScreen;

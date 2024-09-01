// src/screens/AccountScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const account = () => {
  const [user, setUser] = useState({ name: "", email: "", order_id: "" });

  useEffect(() => {
    const profile = async () => {
      try {
        const res = await axios.get(
          "https://bloomzon-backend-1-q2ud.onrender.com/api/profile"
        );

        setUser(res.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    profile();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -30,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>
          Profile
        </Text>
        <Text style={styles.backButton2}></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
          />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileId}>ID 02123141</Text>
          <TouchableOpacity style={styles.editIcon}>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/Orders")}
            >
              <Feather name="package" size={24} color="black" />
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("")}
            >
              <FontAwesome5 name="users" size={24} color="black" />
              <Text style={styles.buttonText}>Followers</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="gift" size={24} color="black" />
              <Text style={styles.buttonText}>Coupons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="customerservice" size={24} color="black" />
              <Text style={styles.buttonText}>Help Center</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Edit Profile</Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Set sales regions </Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Set currency </Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>
              Activate / deactive auto sell{" "}
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Add / switch accounts</Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Logistics / delivery I use </Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>5</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Log Out</Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileId: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 30,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
  },
  settingsContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    fontSize: 16,
  },
  notificationBadge: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  notificationCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
});

export default account;

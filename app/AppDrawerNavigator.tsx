import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons/";
import CustomBarChart from "../components/CustomBarChart";
import { router } from "expo-router";
import { ProductsContext } from "@/constants/ProductsData";

const index: React.FC = () => {

  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const drawerWidth = screenWidth * 0.75;
  const drawerTranslation = useRef(new Animated.Value(-drawerWidth)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerTranslation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerTranslation, {
      toValue: -drawerWidth,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const toggleDrawer = () => {
    if (drawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const handleMonthSelect = (month: React.SetStateAction<string>) => {
    setSelectedMonth(month);
    setDropdownVisible(false);
  };

  const barChartData = [
    { label: "Jan", value: 4500 },
    { label: "Feb", value: 8000 },
    { label: "Mar", value: 6000 },
    { label: "Apr", value: 3000 },
    { label: "May", value: 7000 },
    { label: "Jun", value: 1000 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {drawerOpen && (
        <TouchableOpacity style={styles.overlay} onPress={closeDrawer} />
      )}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: drawerTranslation }] },
        ]}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebartitle}>
            <Text style={{ color: "#FF8C00" }}>Bloomzon</Text> Seller
          </Text>
          <TouchableOpacity onPress={closeDrawer}>
            <MaterialIcons name="cancel" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.drawerItem}>
            <Image
              source={require("../assets/flags/usa.png")}
              style={{
                width: 35,
                height: 35,
                marginRight: 10,
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                marginRight: 10,
                fontFamily: "Semibold",
              }}
            >
          
            </Text>
            <AntDesign name="down" size={16} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 60,
                marginTop: -25,
              }}
            >
              <Ionicons name="settings" size={30} color="#555" />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.drawerContent}>
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Inventory
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Pricing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Payments
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Communications
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Help
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Seller Support
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Send us App Feedback
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                marginBottom: 18,
              }}
              onPress={() => router.push("/LoginScreen")}
            >
              <Text
                style={{
                  marginBottom: 20,
                  fontFamily: "Regular",
                  fontSize: 16,
                  color: "red",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>

            {/* Add more menu items as needed */}
          </View>
        </ScrollView>
      </Animated.View>
      <SafeAreaView style={styles.mainContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Ionicons
              name="menu-outline"
              size={20}
              color="#000"
              style={{
                backgroundColor: "#eee",
                padding: 15,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            <Text style={{ color: "#FF8C00" }}>Bloomzon</Text> Seller
          </Text>
          <MaterialIcons
            name="filter-center-focus"
            size={25}
            color="#000"
            style={{
              backgroundColor: "#eee",
              padding: 12,
              borderRadius: 100,
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView
            horizontal
            style={styles.cardContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Total Orders</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>1</Text>
            </View>

            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Total Sales</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>$1,627</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Total Unit</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>43</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Current Balance</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>$810</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Next Payment</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>15 July, 2024</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Customer Feedbacks</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="star" size={20} color={"#FF8C00"} />
                <MaterialIcons name="star" size={20} color={"#FF8C00"} />
                <MaterialIcons name="star" size={20} color={"#FF8C00"} />
                <MaterialIcons name="star" size={20} color={"#FF8C00"} />
                <MaterialIcons name="star" size={20} color={"#ddd"} />
              </View>
            </View>
            <View style={styles.card7}>
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardTitle}>Seller Feedbacks</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"#00D1A3"}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.cardValue}>213 reviews</Text>
            </View>
            {/* Add more cards as needed */}
          </ScrollView>
          <View style={styles.chartContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={styles.chartTitle}>Income Statistics</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setDropdownVisible(true)}
              >
                <Text>{selectedMonth}</Text>
                <AntDesign name="down" size={16} color="#000" />
              </TouchableOpacity>
            </View>

            <Modal
              visible={isDropdownVisible}
              transparent
              animationType="slide"
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setDropdownVisible(false)}
              >
                <View style={styles.modalContent}>
                  {[
                    "6 months",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={styles.dropdownItem}
                      onPress={() => handleMonthSelect(month)}
                    >
                      <Text>{month}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Bold",
                  }}
                >
                  $450.75
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Regular",
                    marginBottom: 10,
                    color: "#666",
                  }}
                >
                  Last 30 days
                </Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Bold",
                  }}
                >
                  18% <Ionicons name="arrow-up" size={20} color={"limegreen"} />
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Regular",
                    marginBottom: 10,
                    color: "#666",
                  }}
                >
                  Previous 30 days
                </Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Bold",
                  }}
                >
                  40% <Ionicons name="arrow-down" size={20} color={"red"} />
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Regular",
                    marginBottom: 10,
                    color: "#666",
                  }}
                >
                  Last year
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column", marginTop: -25 }}>
                <Text style={styles.chartPrice}>$10K</Text>
                <Text style={styles.chartPrice}>$8K</Text>
                <Text style={styles.chartPrice}>$6K</Text>
                <Text style={styles.chartPrice}>$4K</Text>
                <Text style={styles.chartPrice}>$2K</Text>
                <Text style={styles.chartPrice}>$0K</Text>
              </View>

              <CustomBarChart data={barChartData} />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={styles.tabsContainer}
              onPress={() => router.push("/AddProduct")}
            >
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="folder-plus"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Add a Product</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="graduation-cap"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Quick Start Guide</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={styles.tabsContainer}
              onPress={() => router.push("/Orders")}
            >
              <View style={styles.tabContent}>
                <Ionicons
                  name="save"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Manage Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="reply-all"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Manage Returns</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={styles.tabsContainer}
              onPress={() => router.push("/Inventory")}
            >
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="store"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Manage Inventory</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="credit-card"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Payments</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <Entypo
                  name="chat"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Communications</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="chart-simple"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Business Analysis</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="chart-simple"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Advertisement</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <Ionicons
                  name="pricetags"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Coupons</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="repeat"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Subscribe & Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="circle-info"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Feedback</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <MaterialIcons
                  name="reviews"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Customer Review</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsContainer}>
              <View style={styles.tabContent}>
                <FontAwesome6
                  name="chart-line"
                  size={30}
                  color="#00D1A3"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.tabText}>Growth Opportunity</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}></View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  drawer: {
    position: "absolute",
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  drawerContent: {
    padding: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerText: {
    marginLeft: 10,
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginTop: 40,
  },
  sidebar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00D1A3",
  },
  sidebartitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00D1A3",
    marginLeft: -1,
  },
  cardContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginRight: 10,
    elevation: 2,
    width: 180,
    alignSelf: "center",
    left: 10,
  },
  card7: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginRight: 15,
    elevation: 2,
    width: 180,
    alignSelf: "center",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#00D1A3",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chartContainer: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: "#eee",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: "80%",
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  tabsContainer: {
    borderWidth: 2,
    padding: 30,
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
    fontSize: 13,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  chartPrice: {
    marginBottom: 15,
    color: "#555",
  },
});

export default index;

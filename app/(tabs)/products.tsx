import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// const orders = [
//   { id: '1', title: 'Essential Casual Orange Basic Short Sleeve Tee', price: 500, status: 'Inactive', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img14.jpg') },
//   { id: '2', title: 'Pull Over Orange Basic Short Tee', price: 500, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img3.jpg') },
//   { id: '3', title: 'Short Black Print T-Shirt', price: 600, status: 'Inactive', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img4.jpg') },
//   { id: '4', title: 'OFF thug Black Print', price: 600, status: 'Inactive', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img5.jpg') },
//   { id: '5', title: 'Casual Graphic T-Shirt', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img6.jpg') },
//   { id: '6', title: 'Black Print Casual Graphic T-Shirt', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img7.jpg') },
//   { id: '7', title: 'Print Casual Graphic T-Shirt', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img8.jpg') },
//   { id: '8', title: 'Graphic T-Shirt', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img9.jpg') },
//   { id: '9', title: 'T-Shirt Blue Trouser', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img10.jpg') },
//   { id: '10', title: 'Latest Black Print Casual Graphic T-Shirt', price: 600, status: 'Active', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img11.jpg') },
//   { id: '11', title: 'Latest Black Print Casual Graphic T-Shirt', price: 600, status: 'Inactive', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img12.jpg') },
//   { id: '12', title: 'Upcoming Black Print Casual Graphic T-Shirt', price: 600, status: 'Inactive', sku: 'ORANGE-SHIRT-WOMEN', image: require('../../assets/products/img13.jpg') },
//   // Add more orders as needed
// ];

const Products: React.FC = () => {
  const [orders, setOrders] = useState([{ title: "", status: "", id: "" }]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const product = async () => {
      try {
        const res = await axios.get(
          "https://bloomzon-backend-1-q2ud.onrender.com/api/products"
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    product();
  }, []);

  console.log("order", orders);

  const filteredOrders = orders.filter(
    (order) =>
      (selectedTab === "All" || order?.status === selectedTab) &&
      order.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const toggleMenu = (order: any, event: any) => {
    setSelectedOrder(order);
    setMenuModalVisible(true); // Show menu modal
    setMenuVisible(!menuVisible);

    if (!menuVisible) {
      const { pageX, pageY } = event.nativeEvent;
      setMenuPosition({ x: pageX, y: pageY });
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuModalVisible(false);
  };

  const openDeleteModal = () => {
    setMenuModalVisible(false); // Close the menu modal
    setDeleteModalVisible(true); // Open delete confirmation modal
  };

  const handleDelete = () => {
    // Add your delete logic here
    setDeleteModalVisible(false);
  };
  const renderOrderItem = ({ item }: any) => (
    <View style={styles.orderItem}>
      <Image source={item?.images} style={styles.productImage} />
      <View style={styles.orderTextContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.orderTitle}>{item?.prod_name}</Text>
          <TouchableOpacity onPress={(e) => toggleMenu(item, e)}>
            <Feather name="more-horizontal" size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.orderPrice}>${item?.price}</Text>
        <Text style={styles.orderDetails}>
          <Text style={{ fontWeight: "700", color: "#000" }}>SKU:</Text>{" "}
          {item.seller_sku}
        </Text>
        <Text
          style={[
            styles.orderStatus,
            item.status === "Inactive"
              ? styles.statusCancelled
              : styles.statusPending,
          ]}
        >
          <Text style={{ fontWeight: "700", color: "#000", gap: 10 }}>
            Status:
          </Text>{" "}
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: -60,
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
          Products
        </Text>
        <TouchableOpacity style={styles.backButton2}></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={22}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterIcon}>
          <FontAwesome5 name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBloomzonButton}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                left: 160,
              }}
            >
              <AntDesign
                name="reload1"
                size={20}
                color="#00D1A3"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.viewBloomzonText}>
                Switch to Bloomzon Ship
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabContainer}>
              {["All", "Active", "Inactive"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  style={[
                    styles.tabItem,
                    selectedTab === tab && styles.activeTabItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.products}
        />

        {/* Menu Modal */}
        <Modal
          transparent={true}
          visible={menuModalVisible}
          animationType="fade"
          onRequestClose={closeMenu}
        >
          <Pressable style={styles.overlay} onPress={closeMenu}>
            <View
              style={[
                styles.menuCard,
                { top: menuPosition.y - 20, left: menuPosition.x - 200 },
              ]}
            >
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="calendar" size={20} color="#000" />
                <Text style={styles.menuItemText}>Schedule Pickup</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="printer" size={20} color="#000" />
                <Text style={styles.menuItemText}>Print Packing Slip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign name="closecircleo" size={20} color="red" />
                <Text style={[styles.menuItemText, { color: "red" }]}>
                  Cancel Order
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    width: SCREEN_WIDTH,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderColor: "#eee",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  filterIcon: {
    backgroundColor: "#F37300",
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewBloomzonButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#eee",
    padding: 20,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  viewBloomzonText: {
    color: "#00D1A3",
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statusItem: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    color: "#000",
    fontSize: 12,
  },
  tabScrollContainer: {
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    padding: 10,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#F37300",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#F37300",
  },
  orderItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 105,
    height: 120,
    marginRight: 2,
    borderRadius: 8,
    left: -14,
  },
  orderTextContainer: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 14,
    fontFamily: "Semibold",
    width: "80%",
  },
  orderPrice: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Bold",
  },
  orderDetails: {
    color: "#888",
  },
  orderStatus: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: "#000",
    alignSelf: "flex-start",
    left: -10,
  },
  statusPending: {},
  statusCancelled: {},
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: 15,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  menuCard: {
    position: "absolute",
    width: "55%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  products: {
    padding: 15,
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: -10,
  },
});

export default Products;

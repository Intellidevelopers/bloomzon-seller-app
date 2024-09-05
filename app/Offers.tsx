import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ProductsContext } from "@/constants/ProductsData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Offers = () => {
  const { prodData, setProdData } = useContext(ProductsContext);

  const [data, setData] = useState<any>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedFulfillment, setSelectedFulfillment] =
    useState("Bloomzon Pickup");
  const [quantity, setQuantity] = useState(0);
  const [sku, setSku] = useState("");
  const [Yprice, setYprice] = useState("");
  const [Lprice, setLprice] = useState("");
  const [Rprice, setRprice] = useState("");
  const [modalData, setModalData] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<any>({
    category: "",
    subcategory: "",
    type: "",
    select: "",
    brand: "",
  });

  useEffect(() => {
    if (Object.keys(selectedValues).includes("condition")) {
      setData({ ...data, condition: selectedValues["condition"] });
    }
    if (Object.keys(selectedValues).includes("country of region")) {
      setData({
        ...data,
        region: selectedValues["country of region"],
      });
    }
  }, [selectedValues]);

  const openModal = (field: string) => {
    let data: string[] = [];
    switch (field) {
      case "Condition":
        data = ["New", "Used", "Refurbished"];
        break;
      case "Country of region":
        data = ["United Kingdom", "Nigeria", "USA"];
        break;
      case "Outer material type":
        data = ["Material 1", "Material 2", "Material 3"];
        break;
      case "Style":
        data = ["Style 1", "Style 2", "Style 3"];
        break;
      case "Gender":
        data = ["Male", "Female", "Rather not to say"];
        break;
      case "Strap type":
        data = ["Strap type 1", "Strap type 2", "Strap type 3"];
        break;
      default:
        break;
    }
    setModalData(data);
    setSelectedField(field);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedField("");
  };

  const selectItem = (item: string) => {
    setSelectedValues((prevValues: any) => ({
      ...prevValues,
      [selectedField.toLowerCase() as keyof typeof selectedValues]: item,
    }));
    closeModal();
  };

  const renderModalItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const toggleRememberMe = () => {
    setSelectedValues((prevValues: any) => ({
      ...prevValues,
      brand: prevValues.brand ? "" : "No Brand",
    }));
  };

  // HANDLE SUBMISSION
  const handleSubmit = () => {
    setProdData({
      ...prodData,
      ...data,
      seller_sku: sku,
      your_price: Yprice,
      list_price: Lprice,
      quantity,
      max_retail_price: Rprice,
      channel: selectedFulfillment,
    });
    router.push("/Gallery");
  };

  return (
    <SafeAreaView style={styles.container}>
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
          Offers
        </Text>
        <TouchableOpacity style={styles.backButton2}></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Info</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Variations</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Offers</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
            <Text style={styles.progressLabel}>Gallery</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
            <Text style={styles.progressLabel}>Description</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
            <Text style={styles.progressLabel}>Keywords</Text>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            seller SKU
          </Text>

          <TextInput
            style={{
              borderWidth: 2,
              width: "90%",
              alignSelf: "center",
              padding: 10,
              borderRadius: 7,
              borderColor: "#eee",
              left: -4,
            }}
            placeholder="Enter seller SKU"
            keyboardType="default"
            onChangeText={setSku}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            left: 15,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="alert-circle-outline"
            color={"#666"}
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontFamily: "Regular", color: "#666" }}>
            Once submitted, it cannot be changed.
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Your price
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your price"
              keyboardType="default"
              onChangeText={setYprice}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            List price
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter list price"
              keyboardType="default"
              onChangeText={setLprice}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Quantity
          </Text>

          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.textInputQuantity}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={(text) => setQuantity(parseInt(text))}
            />
            <TouchableOpacity
              style={styles.incrementButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.incrementButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {["Condition", "Country of region"].map((field) => (
          <View key={field} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
              {field}
            </Text>

            <TouchableOpacity onPress={() => openModal(field)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#eee",
                  padding: 10,
                  width: "91%",
                  alignSelf: "center",
                  borderRadius: 7,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontFamily: "Regular", color: "#666", fontSize: 15 }}
                >
                  {selectedValues[
                    field.toLowerCase() as keyof typeof selectedValues
                  ] || `Select ${field.toLowerCase()}`}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  color={"#666"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Maximum retail price
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter maximum retail price"
              keyboardType="default"
              onChangeText={setRprice}
            />
            <Text style={styles.icon}>$</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Fulfillment channel</Text>

        <Pressable
          style={styles.fulfillmentOption}
          onPress={() => setSelectedFulfillment("Bloomzon Ship")}
        >
          <View style={styles.radioContainer}>
            <View
              style={[
                styles.radioButton,
                selectedFulfillment === "Bloomzon Ship" && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>Bloomzon Ship</Text>
          </View>
          <Text style={styles.fulfillmentText}>
            You store your products in the nearest Bloomzon warehouse, and we
            take care of shipping to your customers.
          </Text>
        </Pressable>

        <Pressable
          style={styles.fulfillmentOption}
          onPress={() => setSelectedFulfillment("Bloomzon Pickup")}
        >
          <View style={styles.radioContainer}>
            <View
              style={[
                styles.radioButton,
                selectedFulfillment === "Bloomzon Pickup" &&
                  styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>Bloomzon Pickup</Text>
          </View>
          <Text style={styles.fulfillmentText}>
            You store and pack orders at your location. We pick them up from the
            provided address and deliver them to customers.
          </Text>
        </Pressable>

        <Pressable
          style={styles.fulfillmentOption}
          onPress={() => setSelectedFulfillment("Self Ship")}
        >
          <View style={styles.radioContainer}>
            <View
              style={[
                styles.radioButton,
                selectedFulfillment === "Self Ship" && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>Self Ship</Text>
          </View>
          <Text style={styles.fulfillmentText}>
            You store and pack orders at your location. Then, you deliver them
            to customers yourself or use a third-party courier.
          </Text>
        </Pressable>
        <View style={{ marginBottom: 20 }}></View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={modalData}
                renderItem={renderModalItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
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
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 40,
  },
  progressItem: {
    alignItems: "center",
  },
  activeProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: "#00D1A3",
    borderRadius: 10,
  },
  inactiveProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  progressLabel: {
    marginTop: 5,
    fontSize: 10,
    color: "#555",
  },

  backButtonText: {
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: "#FF8C00",
  },
  rememberMe: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "blue",
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: "92%",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Regular",
  },
  fulfillmentOption: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#FF8C00",
  },
  radioText: {
    fontSize: 16,
    fontFamily: "Semibold",
    color: "#333",
  },
  fulfillmentText: {
    marginTop: 5,
    fontSize: 13,
    color: "#555",
    fontFamily: "Regular",
    left: 30,
    width: "90%",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Semibold",
    marginVertical: 10,
    left: 17,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    padding: 10,
    width: "91%",
    alignSelf: "center",
    borderRadius: 7,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Regular",
    color: "#333",
  },
  icon: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    width: "91%",
    alignSelf: "center",
    borderRadius: 7,
  },
  textInputQuantity: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Regular",
    color: "#333",
    padding: 10,
  },
  incrementButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#00D1A3",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  incrementButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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

export default Offers;

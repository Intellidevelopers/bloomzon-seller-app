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
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ProductsContext } from "@/constants/ProductsData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AddProduct = () => {
  const { prodData, setProdData } = useContext(ProductsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [modalData, setModalData] = useState<string[]>([]);
  const [id, setId] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [newdate, setDate] = useState(new Date());
  const [item, setItem] = useState("");
  const [modNumer, setModNumber] = useState("");
  const [prodName, setProdName] = useState("");
  const [data, setData] = useState<any>("");

  const [selectedValues, setSelectedValues] = useState<any>({
    category: "",
    subcategory: "",
    type: "",
    select: "",
    brand: "",
    bookingDate: "",
  });

  // GET THE VALUES

  useEffect(() => {
    if (Object.keys(selectedValues).includes("product category")) {
      setData({ ...data, category: selectedValues["product category"] });
    }
    if (Object.keys(selectedValues).includes("product sub-category")) {
      setData({
        ...data,
        sub_category: selectedValues["product sub-category"],
      });
    }
    if (Object.keys(selectedValues).includes("closure type")) {
      setData({
        ...data,
        closure_type: selectedValues["closure type"],
      });
    }
    if (Object.keys(selectedValues).includes("gender")) {
      setData({
        ...data,
        gender: selectedValues["gender"],
      });
    }
    if (Object.keys(selectedValues).includes("outer material type")) {
      setData({
        ...data,
        outer_material: selectedValues["outer material type"],
      });
    }
    if (Object.keys(selectedValues).includes("style")) {
      setData({
        ...data,
        style: selectedValues["style"],
      });
    }
    if (Object.keys(selectedValues).includes("strap type")) {
      setData({
        ...data,
        strap_type: selectedValues["strap type"],
      });
    }
  }, [selectedValues]);

  const openModal = (field: string) => {
    let data: string[] = [];
    switch (field) {
      case "Product category":
        data = ["Electronics", "Clothing", "Home Appliances"];
        break;
      case "Product sub-category":
        data = ["Mobile Phones", "Laptops", "Tablets"];
        break;
      case "Closure type":
        data = ["New", "Used", "Refurbished"];
        break;
      case "Select":
        data = ["Option 1", "Option 2", "Option 3"];
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedValues((prevValues: any) => ({
      ...prevValues,
      bookingDate: date.toLocaleDateString(),
    }));
    setDate(date);
    hideDatePicker();
  };

  const generateUniqueId = () => {
    const prefix = "BL";
    const randomPart = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates a random string of length 8
    return `${prefix}${randomPart}`;
  };

  const [productId, setProductId] = useState(generateUniqueId());

  // SUBMISSION BUTTON

  const handleSubmit = () => {
    setProdData({
      ...data,
      ...prodData,
      brand_name: BrandName,
      booking_date: newdate,
      num_of_items: item,
      model_number: modNumer,
      prod_name: prodName,
      prod_id: new Date().getTime(),
    });
    router.push("/VariationsScreen");
  };

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
          Product Details
        </Text>
        <Text style={styles.backButton2}></Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Info</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
            <Text style={styles.progressLabel}>Variations</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.inactiveProgressBar} />
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

        <View style={{ left: 16, marginBottom: 20 }}>
          <Text style={{ fontFamily: "Semibold", fontSize: 18 }}>
            Product Details
          </Text>
          <Text style={{ fontFamily: "Regular", fontSize: 14, color: "#666" }}>
            Provide essential details to list your product Accurate information
            helps customers find and purchase your items
          </Text>
        </View>

        {["Product category", "Product sub-category", "Closure type"].map(
          (field) => (
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
                    style={{
                      fontFamily: "Regular",
                      color: "#666",
                      fontSize: 15,
                    }}
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
          )
        )}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Product ID
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
              left: 17,
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                borderWidth: 2,
                width: "50%",
                alignSelf: "center",
                padding: 10,
                borderRadius: 7,
                borderColor: "#eee",
                left: 13,
                fontFamily: "Semibold",
                color: "#666",
              }}
              keyboardType="default"
              value={productId}
              onChangeText={setId}
              editable={false}
              readOnly
            />

            <TouchableOpacity onPress={() => openModal("Select")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#eee",
                  padding: 9,
                  width: "60%",
                  alignSelf: "center",
                  borderRadius: 7,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontFamily: "Regular", color: "#666", fontSize: 15 }}
                >
                  {selectedValues.select || "Select"}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  color={"#666"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", left: 15 }}
          >
            <Ionicons
              name="alert-circle-outline"
              color={"#666"}
              size={25}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontFamily: "Regular", color: "#666" }}>
              This product doesn't have a brand name
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Product name
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
            placeholder="Enter product name"
            keyboardType="default"
            onChangeText={setProdName}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Brand name
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
            placeholder="Enter brand name"
            keyboardType="default"
            onChangeText={setBrandName}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            left: 15,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={toggleRememberMe}
          >
            <View
              style={[
                styles.checkbox,
                selectedValues.brand ? styles.checkboxChecked : null,
              ]}
            >
              {selectedValues.brand && (
                <AntDesign name="check" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.rememberMe}>
              This product doesn't have a brand name
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "Medium", left: 15 }}>
            Model number
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
            placeholder="Enter model number"
            keyboardType="numeric"
            onChangeText={setModNumber}
          />
        </View>

        {["Outer material type", "Style", "Gender"].map((field) => (
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
            Number of items
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
            placeholder="Enter number of items"
            keyboardType="numeric"
            onChangeText={setItem}
          />
        </View>

        {["Strap type"].map((field) => (
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
            Booking Date
          </Text>

          <TouchableOpacity onPress={showDatePicker}>
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
                {selectedValues.bookingDate || "Select booking date"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                color={"#666"}
                size={30}
              />
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
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
    </View>
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

  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
});

export default AddProduct;

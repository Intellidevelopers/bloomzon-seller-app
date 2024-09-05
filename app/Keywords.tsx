import { ProductsContext } from "@/constants/ProductsData";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Keywords = () => {
  const { prodData, images } = useContext(ProductsContext);

  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://bloomzon-backend-1-q2ud.onrender.com/api/product",
        {
          ...prodData,
          images: images,
          keywords: newKeyword,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      // router.push("/UploadSuccess");
    } catch (err) {
      console.log(err, "HEY, IM AN ERROR");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -30,
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>
          Keywords
        </Text>
        <TouchableOpacity style={styles.backButton2}></TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
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
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Gallery</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Description</Text>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.activeProgressBar} />
            <Text style={styles.progressLabel}>Keywords</Text>
          </View>
        </View>

        <Text style={styles.title}>Product Keywords</Text>
        <Text style={styles.subtitle}>
          Enhance your product's visibility and search ranking by adding and
          managing relevant keywords. Use specific and targeted keywords to
          attract more potential buyers and boost your sales.
        </Text>

        <Text style={styles.label}>Keywords</Text>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search Keywords..."
            value={newKeyword}
            onChangeText={setNewKeyword}
            onSubmitEditing={addKeyword}
          />
        </View>

        <FlatList
          data={keywords}
          renderItem={({ item }) => (
            <View style={styles.keywordContainer}>
              <Text style={styles.keywordText}>{item}</Text>
              <TouchableOpacity onPress={() => removeKeyword(item)}>
                <AntDesign name="closecircle" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.keywordList}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 80, // Ensure content is not hidden behind the button
  },
  title: {
    fontSize: 18,
    fontFamily: "Semibold",
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 10,
    color: "#666",
    fontFamily: "Regular",
  },
  label: {
    fontSize: 17,
    marginTop: 20,
    fontFamily: "Semibold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 30,
  },
  keywordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8C00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  keywordText: {
    color: "white",
    marginRight: 10,
  },
  keywordList: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FF8C00",
    padding: 18,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 210,
  },
  buttonText: {
    color: "white",
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
    left: 13,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 40,
    width: "105%",
    alignSelf: "center",
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
  progressLabel: {
    marginTop: 5,
    fontSize: 10,
    color: "#555",
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

export default Keywords;

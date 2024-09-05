import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes"; // Import the types
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { ProductsContext } from "@/constants/ProductsData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type GalleryNavigationProp = StackNavigationProp<RootStackParamList, "Gallery">;

const Gallery = () => {
  const { images, setImages } = useContext(ProductsContext);

  const navigation = useNavigation<GalleryNavigationProp>();
  const [media, setMedia] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [image, setImage] = useState<(any | null)[]>([]);
  const [isVideo, setIsVideo] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const pickMedia = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newMedia = [...media];
      newMedia[index] = result.assets[0].uri;

      const newImage = [...image];
      newImage[index] = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };

      const newIsVideo = [...isVideo];
      newIsVideo[index] = result.assets[0].type === "video";

      setImage(newImage);

      setMedia(newMedia);
      setIsVideo(newIsVideo);
    }
  };

  const removeMedia = (index: number) => {
    const newMedia = [...media];
    newMedia[index] = null;
    setMedia(newMedia);

    const newIsVideo = [...isVideo];
    newIsVideo[index] = false;
    setIsVideo(newIsVideo);
  };

  const handleReorder = () => {
    const filteredMedia = media
      .map((uri, index) => ({ uri, isVideo: isVideo[index] }))
      .filter((item) => item.uri !== null);

    navigation.navigate("Reorder", { media: filteredMedia });
  };

  // HANDLE SUBMISSION
  const handleSubmit = () => {
    setImages(image.filter((item) => item !== undefined));
    router.push("/ProductDescription");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -35,
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>
          Gallery
        </Text>
        <TouchableOpacity style={styles.backButton2}></TouchableOpacity>
      </View>
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
          <View style={styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Description</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Keywords</Text>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.subHeaderText}>Add Product Images and a video</Text>
        <Text style={styles.descriptionText}>
          Upload clear and high-quality images and a video of your product. Good
          photos attract more customers and help them make informed buying
          decisions. You can add up to 5 images and a video.
        </Text>
        <TouchableOpacity style={styles.reorderButton} onPress={handleReorder}>
          <Text style={styles.reorderText}>Reorder</Text>
          <Ionicons name="swap-vertical-outline" size={16} color="#00ADEF" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {media.map((item, index) => (
            <View key={index} style={styles.imageWrapper}>
              {item ? (
                <>
                  {isVideo[index] ? (
                    <Video
                      source={{ uri: item }}
                      style={styles.media}
                      useNativeControls
                      shouldPlay={true}
                      isMuted
                    />
                  ) : (
                    <Image source={{ uri: item }} style={styles.media} />
                  )}
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => removeMedia(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={() => pickMedia(index)}
                >
                  <MaterialCommunityIcons
                    name="file-image-plus"
                    size={40}
                    color="#888"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 13,
    width: SCREEN_WIDTH,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Medium",
    textAlign: "center",
    marginBottom: 16,
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
  subHeaderText: {
    fontSize: 18,
    fontFamily: "Medium",
    marginBottom: 8,
    textAlign: "left",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#666",
    marginBottom: 16,
    textAlign: "left",
  },
  reorderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    alignSelf: "flex-end",
  },
  reorderText: {
    color: "#00ADEF",
    fontSize: 16,
    fontFamily: "Regular",
    marginRight: 4,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  imageWrapper: {
    width: "30%",
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  saveButton: {
    backgroundColor: "#FFA500",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    width: "100%",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: "Semibold",
    fontSize: 14,
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

  backButtonText: {
    color: "#007AFF",
    fontSize: 14,
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

export default Gallery;

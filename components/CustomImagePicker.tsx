import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface CustomImagePickerProps {
  picture: string | null;
  onChangePicture: (uri: string | null) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ picture, onChangePicture }) => {
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChangePicture(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePickImage}>
      <Image
        source={picture ? { uri: picture } : require('../assets/images/user4.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#f5f5f5',
  },
});

export default CustomImagePicker;

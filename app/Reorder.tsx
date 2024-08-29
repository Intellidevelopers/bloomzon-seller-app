import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Video } from 'expo-av';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes'; // Import the types
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


type ReorderNavigationProp = StackNavigationProp<RootStackParamList, 'Reorder'>;
type ReorderRouteProp = RouteProp<RootStackParamList, 'Reorder'>;

const Reorder = () => {
  const navigation = useNavigation<ReorderNavigationProp>();
  const route = useRoute<ReorderRouteProp>();
  const { media } = route.params;

  // Ensure media is always an array of objects
  const [data, setData] = useState(media.map((item, index) => ({
    key: index.toString(),
    uri: item.uri,
    isVideo: item.isVideo,
  })));

  const renderItem = ({ item, drag, isActive }: RenderItemParams<{ key: string; uri: string | null; isVideo: boolean }>) => {
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: isActive ? '#f0f0f0' : '#fff' }]}
        onLongPress={drag}
      >
        <View style={styles.imageWrapper}>
          {item.uri ? (
            item.isVideo ? (
              <Video
                source={{ uri: item.uri }}
                style={styles.media}
                useNativeControls
                shouldPlay={true}
                isMuted
              />
            ) : (
              <Image source={{ uri: item.uri }} style={styles.media} />
            )
          ) : null}
        </View>
        <Text style={styles.itemText}>Hold and drag item to reorder.</Text>
        <Ionicons name="menu" size={24} color="#aaa" />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
       <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20,justifyContent: "space-between", marginTop: -10 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name='x' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Reorder</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Semibold',
    textAlign: 'center',
    marginBottom: 16,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 2,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Regular',
    color: '#333',
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: 15
  },

  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: -10
  },
});

export default Reorder;

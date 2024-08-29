import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type ItemProps = {
  content: {
    text: string;
    screen: string;
  };
};

const GrowthOpportunity: React.FC = () => {
  const List = [
    { text: 'Growth Opportunities', screen: '/Growth' },
    { text: 'Register as Bloomzon Ship', screen: '/BloomzonShip' },
    { text: 'Marketplace Product Gutextance', screen: '/Growth' },
    { text: 'Refer a Friend', screen: '/Growth' },
  ];

  const Item: React.FC<ItemProps> = ({ content }) => (
    <TouchableOpacity style={styles.item} onPress={() => router.push(content.screen)}>
      <Text style={styles.growthText}>{content.text}</Text>
      <AntDesign name='right' style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -20, justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Growth Opportunity</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <FlatList
        data={List}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item content={item} />}
      />
    </SafeAreaView>
  );
}

export default GrowthOpportunity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  icon: {
    fontSize: 24,
    marginRight: 50,
    alignItems: "center",
    alignSelf: "center"
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  backButton: {
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
  rowContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  growthText: {

  },
  arrowIcon: {
    fontSize: 20,
  },
});

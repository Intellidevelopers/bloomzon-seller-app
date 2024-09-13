import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ProductsContext } from "@/constants/ProductsData";

const SidebarMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const { userData } = useContext(ProductsContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <AntDesign name="user" size={50} color="#000" />
        <Text style={styles.username}>{userData.name}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SidebarMenu;

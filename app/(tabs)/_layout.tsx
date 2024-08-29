// TabLayout.js
import { Feather, MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function _Layout() {
  return (
     <Tabs screenOptions={{ tabBarActiveTintColor: '#00D1A3',  tabBarItemStyle:{
      marginBottom: 6, marginTop: 5
    }, }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
         
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'products',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="shop" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'messages',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="chat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'My Account',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
   
  );
}

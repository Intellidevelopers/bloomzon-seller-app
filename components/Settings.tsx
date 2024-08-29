import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-between"}}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Settings</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Options */}
        {renderOption(<FontAwesome6 name='user-large' size={24} color='#00ac8d' />, "Account Info")}
        {renderOption(<Fontisto name='bell-alt' size={24} color='#00ac8d' />, "Notification Preferences")}
        {renderOption(<Ionicons name='log-out' size={24} color='#00ac8d' />, "Login Settings")}
        {renderOption(<MaterialIcons name='assignment-return' size={24} color='#00ac8d' />, "Return Settings")}
        {renderOption(<FontAwesome5 name='shipping-fast' size={20} color='#00ac8d' />, "Shipping Settings")}
        {renderOption(<FontAwesome6 name='gift' size={24} color='#00ac8d' />, "Gift Options")}
        {renderOption(<FontAwesome6 name='clipboard-list' size={24} color='#00ac8d' />, "Tax Settings")}
      </ScrollView>
    </View>
  );
};

const renderOption = (icon: string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined, text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => {
  return (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={styles.optionContent}>
        <View style={styles.optionIconContainer}>
          {icon}
        </View>
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <AntDesign name='right' size={24} color='#000' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    backgroundColor: '#def2eb',
    borderRadius: 24,
    padding: 8,
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Settings;

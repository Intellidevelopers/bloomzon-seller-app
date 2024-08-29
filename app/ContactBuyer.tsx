import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const ContactBuyer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Buyer</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>Send message to Imobighe</Text>
        <Text style={styles.explanation}>Explain why you are contacting with the customer.</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your message..."
          multiline
          numberOfLines={4}
          maxLength={3000}
        />
        <Text style={styles.charLimit}>3000 characters limit</Text>
        <TouchableOpacity style={styles.sendButton} onPress={() => router.push('/Returns')}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    width: SCREEN_WIDTH
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    height: 150,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  charLimit: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  sendButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 5,
    marginTop: '70%',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginBottom: 20,
    justifyContent: "space-between"
  },
  backButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    left: -15
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Semibold",
    marginLeft: 20,
    color: '#000',
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

export default ContactBuyer;

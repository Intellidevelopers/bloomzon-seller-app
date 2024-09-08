import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "../utils/supabase";
import axios from "axios";
import Toast from "react-native-toast-message";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Register: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  async function signUpWithEmail() {
    if (email && password && name) {
      try {
        setLoading(true);

        const res = await axios.post(
          "https://bloomzon-backend-1-q2ud.onrender.com/api/auth/signup",
          {
            email,
            password,
            name,
          }
        );
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Welcome",
          text2: "Sign Up Successful",
        });
        setSuccessModalVisible(true);
      } catch (error: any) {
        Alert.alert(error.message);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "All Fields Required",
        text2: "Please input all fields before signing up",
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={22} />
      </TouchableOpacity>
      <Text style={styles.title}>Register to Bloomzon Seller</Text>
      <TextInput
        style={styles.input}
        placeholder="First and last name"
        keyboardType="default"
        onChangeText={setName}
        autoCapitalize="none"
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
        value={password}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#FF8C00" />
      ) : (
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.buttonDisabled]}
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.terms}>
        By signing up you agree to Bloomzon’s{" "}
        <Text style={styles.link}>Conditions of Use.</Text> Also see our{" "}
        <Text style={styles.link}>Privacy Notice.</Text>
      </Text>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.or}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/LoginScreen")}
      >
        <Text style={styles.registerButtonText}>Login</Text>
      </TouchableOpacity>

      <Modal
        visible={successModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalMessage}>
              You have successfully registered.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessModalVisible(false);
                router.push("/LoginScreen");
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#f3f3f3",
    padding: 20,
    width: 60,
    alignItems: "center",
    borderRadius: 100,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    fontFamily: "Bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Regular",
    color: "#666",
  },
  input: {
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Regular",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 16,
    fontFamily: "Regular",
  },
  forgotPassword: {
    fontSize: 16,
    color: "#FF8C00",
    fontFamily: "Regular",
  },
  loginButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Regular",
  },
  terms: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 15,
    fontFamily: "Medium",
  },
  link: {
    color: "#FF8C00",
    fontFamily: "Medium",
    fontSize: 13,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  or: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 10,
    color: "#666",
  },
  registerButton: {
    backgroundColor: "#F4FAFC",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Register;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from "../utils/supabase";

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    } else {
      router.push('/(tabs)'); // Replace with your home screen route
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22} />
      </TouchableOpacity>
      <Text style={styles.title}>Login to Bloomzon Seller</Text>
      <Text style={styles.subtitle}>Requires an active seller account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or phone number"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <AntDesign name={passwordVisible ? 'eye' : 'eyeo'} size={22} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <AntDesign name="check" size={16} color="#fff" />}
          </View>
          <Text style={styles.rememberMe}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#FF8C00" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={signInWithEmail}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.terms}>
        By signing in you agree to Bloomzon’s{' '}
        <Text style={styles.link}>Conditions of Use.</Text>{' '}
        Also see our <Text style={styles.link}>Privacy Notice.</Text>
      </Text>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.or}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('Register')}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#f3f3f3",
    padding: 20,
    width: 60,
    alignItems: "center",
    borderRadius: 100
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: "Bold"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Regular",
    color: "#666"
  },
  input: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Regular",
    color: "#333"
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
  },
  rememberMe: {
    fontSize: 16,
    fontFamily: "Regular"
  },
  forgotPassword: {
    fontSize: 16,
    color: '#FF8C00',
    fontFamily: "Regular"
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  terms: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: 15,
    fontFamily: "Medium"
  },
  link: {
    color: '#FF8C00',
    fontFamily: "Medium",
    fontSize: 13,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  or: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    color: '#666',
  },
  registerButton: {
    backgroundColor: '#F4FAFC',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  registerButtonText: {
    fontSize: 16,
  }
});

export default LoginScreen;

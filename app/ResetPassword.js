import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '../utils/supabase'; // Adjust the import path as needed

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push('/Success'); // Redirect to success page or show a success message
      }
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22} />
      </TouchableOpacity>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subtitle}>
        Enter your new password below to reset your account password. Make sure to choose a strong password that you haven't used before.
      </Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <AntDesign name={passwordVisible ? 'eye' : 'eyeo'} size={22} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!confirmPasswordVisible}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={toggleConfirmPasswordVisibility}>
          <AntDesign name={confirmPasswordVisible ? 'eye' : 'eyeo'} size={22} color="#666" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
        <Text style={styles.loginButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: '#f3f3f3',
    padding: 20,
    width: 60,
    alignItems: 'center',
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Regular',
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    fontFamily: 'Regular',
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
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
});

export default ResetPassword;

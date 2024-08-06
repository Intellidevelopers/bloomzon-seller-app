import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const OTPVerification: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22} />
      </TouchableOpacity>
      <Text style={styles.title}>Verify your Account</Text>
      <Text style={styles.subtitle}>
        We have sent a One-Time Password (OTP) at <Text style={styles.boldText}>Femi******@gmail.com.</Text> Please enter the OTP below to verify your account.
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={[
              styles.otpInput,
              focusedIndex === index && styles.otpInputFocused
            ]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Text style={styles.resendText}>Didn’t get a code?</Text>
      <Text style={styles.resendLink}>Resend Code</Text>
      <TouchableOpacity style={styles.verifyButton} onPress={() => { router.push('/NewPassword') }}>
        <Text style={styles.verifyButtonText}>Verify</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: "Bold",
    alignSelf: "flex-start"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "Regular",
    color: "#666",
    alignSelf: "flex-start"
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    textAlign: 'center',
    fontSize: 18,
    width: 70,
    height: 50,
  },
  otpInputFocused: {
    borderColor: '#FF8C00',
  },
  resendText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: "#666",
  },
  resendLink: {
    color: '#FF8C00',
    fontFamily: "Regular",
    textAlign: "center"
  },
  verifyButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  boldText:{
    fontFamily: "Semibold",
    color: "#333"
  }
});

export default OTPVerification;

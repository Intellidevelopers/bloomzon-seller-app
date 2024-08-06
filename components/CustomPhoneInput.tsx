import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { Input, Button } from 'react-native-elements';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (phone: string) => {
    setIsValid(PhoneInput.isValidNumber(phone));
    onChange(phone);
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        value={value}
        onChangePhoneNumber={handleChange}
        initialCountry="bd"
        textStyle={styles.phoneInputText}
        style={styles.phoneInput}
      />
      {!isValid && <Text style={styles.errorText}>Invalid phone number</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  phoneInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  phoneInputText: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomPhoneInput;

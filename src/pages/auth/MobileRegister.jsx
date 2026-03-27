import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles/pages/auth/MobileRegister';
import { registerUser } from '../../utils/storage';

const MobileRegister = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

const handleRegister = async () => {
    // Validation: Email must contain @
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email must contain @ symbol.');
      return;
    }

    // Validation: Password must be 8+ characters
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    // Validation: Phone must be exactly 11 digits
    if (number.length !== 11 || !/^\d{11}$/.test(number)) {
      Alert.alert('Error', 'Phone number must be exactly 11 digits.');
      return;
    }
    if (!name || !email || !password || !studentId || !department || !number || !address) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      studentId,
      department,
      number,
      address,
    };

    try {
      await registerUser(newUser);
      Alert.alert('Success', `Welcome, ${name}!`);

      navigation.navigate('Login'); 

    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.authPage}>
          <View style={styles.authCard}>
            <Text style={[styles.title, { fontSize: 28, marginBottom: 10 }]}>
              TradeBlazer
            </Text>
            <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
              Create Account
            </Text>

            <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="ID" value={studentId} onChangeText={setStudentId} />

            <View style={styles.pickerContainer}>
              <Picker selectedValue={department} onValueChange={(value) => setDepartment(value)}>
                <Picker.Item label="Select Department" value="" />
                <Picker.Item label="CITC" value="CITC" />
                <Picker.Item label="CEA" value="CEA" />
                <Picker.Item label="COT" value="COT" />
                <Picker.Item label="CSTE" value="CSTE" />
                <Picker.Item label="CSM" value="CSM" />
                <Picker.Item label="COM" value="COM" />
                <Picker.Item label="CON" value="CON" />
                <Picker.Item label="SHS" value="SHS" />
              </Picker>
            </View>

            <TextInput style={styles.input} placeholder="Phone Number" value={number} onChangeText={setNumber} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.authLink}>Already have an account? Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileRegister;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/pages/auth/MobileLogin';
import { login as storageLogin, isUserLoggedIn } from '../../utils/storage';

const MobileLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();

  // Redirect if already logged in
  useEffect(() => {
    const checkLogin = async () => {
      if (await isUserLoggedIn()) {
        navigation.replace('Dashboard');
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await storageLogin(email, password);
      if (user) {
        Alert.alert('Success', `Welcome back, ${user.name}!`);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Invalid Credentials', 'Email or password is incorrect.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
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
            <Text style={{ fontSize: 16, color: '#666', marginBottom: 30 }}>
              Mobile Trading App
            </Text>

            <TextInput
              style={[styles.input, emailFocus && styles.inputFocused]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={[styles.input, passwordFocus && styles.inputFocused]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.authLink}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileLogin;

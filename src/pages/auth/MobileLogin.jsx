import React, { useState } from 'react';
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
import { login as storageLogin } from '../../utils/storage';
import { useAuth } from '../../context/MobileAuthContext'; // ✅

const MobileLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();
  const { loginUser } = useAuth(); // ✅ use loginUser from context

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await storageLogin(email, password);

      if (user) {
        // Save user in context
        await loginUser(user); // ✅ sets user and updates isLoggedIn

        Alert.alert('Success', `Welcome back, ${user.name}!`);

        // Navigate to dashboard/main stack
        // This happens automatically because AppRoutes will detect isLoggedIn === true
        // But if you want explicit navigation:
        // navigation.replace('Home'); // optional
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
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
import { useAuth } from '../../context/MobileAuthContext';
import { loginRequest } from '../../services/api';
import { setItem } from '../../utils/storage';

const MobileLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();
  const { loginUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // ✅ Response: { user: {...}, access: "...", refresh: "..." }
      const data = await loginRequest(email.trim(), password);

      console.log('Login response:', JSON.stringify(data, null, 2));

      if (!data.access) {
        Alert.alert('Login Failed', 'No access token returned.');
        return;
      }

      // ✅ Save tokens
      await setItem('accessToken', data.access);
      await setItem('refreshToken', data.refresh);

      // ✅ Save user data from data.user
      await setItem('userData', {
        username: data.user.username || '',
        email: data.user.email || '',
        student_id: data.user.student_id || '',
        department: data.user.department || '',
        phone_number: data.user.phone_number || '',
        address: data.user.address || '',
        profile_image: data.user.profile_image || '',
      });

      // ✅ Update auth context
      await loginUser({
        ...data.user,
        accessToken: data.access,
        refreshToken: data.refresh,
        isAuthenticated: true,
      });

      Alert.alert('Success', 'Welcome back!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message ||
          'Cannot connect to server. Make sure your backend is running.'
      );
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
              autoCorrect={false}
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
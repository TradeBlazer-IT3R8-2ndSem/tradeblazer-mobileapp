import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';

export default function App() {
  return (
    <>
      <AppRoutes />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

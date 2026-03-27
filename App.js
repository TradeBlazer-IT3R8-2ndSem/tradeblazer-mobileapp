import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/MobileAuthContext';
import AppRoutes from './src/routes/AppRoutes';

export default function Main() {
  return (
    <AuthProvider>
      <>
        <AppRoutes />
        <StatusBar style="auto" />
      </>
    </AuthProvider>
  );
}

registerRootComponent(Main);

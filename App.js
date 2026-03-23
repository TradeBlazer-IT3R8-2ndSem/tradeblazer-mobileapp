import { registerRootComponent } from 'expo';
import React from 'react';
import { AuthProvider } from './src/context/MobileAuthContext';
import AppRoutes from './src/routes/AppRoutes';

export default function Main() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

registerRootComponent(Main);

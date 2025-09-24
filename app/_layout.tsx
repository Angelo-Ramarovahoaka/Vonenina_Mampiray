import { AuthContext, AuthProvider } from '@/utils/AuthContext';
import { Stack } from 'expo-router';
import React, { useContext } from 'react';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const authstate = useContext(AuthContext);
  
  // Wait for auth state to be ready before showing any screens
  if (!authstate.isReady) {
    return null; // or a loading screen component
  }
  console.log('Auth State:', authstate.user, authstate.isLoggedIn);
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {authstate.isLoggedIn ? (
        <Stack.Screen name="(protected)" />
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </>
      )}
    </Stack>
  );
}

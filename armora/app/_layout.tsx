import { Stack, SplashScreen } from 'expo-router';
import { AuthProvider, useAuth } from './_appContext';
import React from 'react';

SplashScreen.preventAutoHideAsync();

function Ready() {
  const { loading } = useAuth();
  React.useEffect(() => { if (!loading) SplashScreen.hideAsync(); }, [loading]);
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Root() {
  return (
    <AuthProvider>
      <Ready />
    </AuthProvider>
  );
}

import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../_appContext';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Redirect href='/(auth)/login' />;
  return <Stack screenOptions={{ headerTitle: 'Armora' }} />;
}

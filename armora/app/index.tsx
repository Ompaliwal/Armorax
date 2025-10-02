import { Redirect } from 'expo-router';
import { useAuth } from './_appContext';

export default function Index() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return <Redirect href={user ? '/(protected)' : '/(auth)/login'} />;
}

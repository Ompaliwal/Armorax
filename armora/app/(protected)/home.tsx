import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../_appContext';
import { api } from '../_appContext';

export default function Home() {
  const { user, access, logout } = useAuth();

  const getMe = async () => {
    const { data } = await api.get('/me', { headers: { Authorization: `Bearer ${access}` } });
    alert(JSON.stringify(data.user, null, 2));
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text>Welcome {user?.email}</Text>
      <Button title="Call /me" onPress={getMe} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

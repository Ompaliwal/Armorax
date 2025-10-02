import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../_appContext';

export default function Login() {
  const { login } = useAuth();
  const r = useRouter();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const onSubmit = async () => {
    setErr(null);
    try {
      await login(email.trim(), password);
      // pick the actual screen you want:
      r.replace('/');           // if you have app/(protected)/index.tsx
      // or r.replace('/home'); // if you have app/(protected)/home.tsx
    } catch (e: any) {
      setErr(e?.response?.data?.error ?? 'Login failed');
    }
  };
  

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Login</Text>
      <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {err && <Text style={{ color: 'red' }}>{err}</Text>}
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
}

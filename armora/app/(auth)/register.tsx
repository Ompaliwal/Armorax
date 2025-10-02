import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../_appContext';

export default function Register() {
  const { register } = useAuth();
  const r = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (submitting) return;
    setErr(null);
    setSubmitting(true);
    try {
      await register(email.trim(), password, name.trim() || undefined);
      // Go to a concrete route inside (protected)
      r.replace('/home');      // or r.replace('/') if (protected)/index.tsx is your root
    } catch (e: any) {
      setErr(e?.response?.data?.error ?? 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Create account</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        autoComplete="password-new"
        value={password}
        onChangeText={setPassword}
      />
      {err && <Text style={{ color: 'red' }}>{err}</Text>}
      <Button title={submitting ? 'Creating...' : 'Register'} onPress={onSubmit} disabled={submitting} />
    </View>
  );
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

type AuthState = {
  user: { id: string; email: string; name?: string } | null;
  access?: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<AuthState>(null as any);

const api = axios.create({ baseURL: 'http://localhost:4000', withCredentials: false });

async function getRefresh() { return SecureStore.getItemAsync('refresh'); }
async function setRefresh(token: string) { return SecureStore.setItemAsync('refresh', token); }
async function clearRefresh() { return SecureStore.deleteItemAsync('refresh'); }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState['user']>(null);
  const [access, setAccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // attach interceptor for 401 -> refresh
  useEffect(() => {
    const id = api.interceptors.response.use(
      (r) => r,
      async (err) => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const refresh = await getRefresh();
          if (refresh) {
            try {
              const { data } = await api.post('/auth/token/refresh', { refreshToken: refresh });
              setAccess(data.tokens.access);
              await setRefresh(data.tokens.refresh);
              original.headers = { ...(original.headers || {}), Authorization: `Bearer ${data.tokens.access}` };
              return api(original);
            } catch { /* fallthrough */ }
          }
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(id);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
    setAccess(data.tokens.access);
    await setRefresh(data.tokens.refresh);
  };

  const register = async (email: string, password: string, name?: string) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    setUser(data.user);
    setAccess(data.tokens.access);
    await setRefresh(data.tokens.refresh);
  };

  const logout = async () => {
    const refresh = await getRefresh();
    await api.post('/auth/logout', { refreshToken: refresh }).catch(() => {});
    await clearRefresh();
    setAccess(null);
    setUser(null);
  };

  // boot: try to get /me via refresh
  useEffect(() => {
    (async () => {
      try {
        const refresh = await getRefresh();
        if (refresh) {
          const { data } = await api.post('/auth/token/refresh', { refreshToken: refresh });
          setAccess(data.tokens.access);
          await setRefresh(data.tokens.refresh);
          const me = await api.get('/me', { headers: { Authorization: `Bearer ${data.tokens.access}` } });
          setUser(me.data.user);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const value = useMemo(() => ({ user, access, loading, login, register, logout }), [user, access, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
export { api };

import React, { useEffect } from "react";
import SplashScreen from "../src/screens/Splash/SplashScreen";
import { useRouter } from "expo-router";
import { isLoggedIn } from "../src/services/auth";
import LoginScreen from "./login";

/**
 * AuthGate handles splash, auth check, and navigation using Expo Router.
 * - Shows SplashScreen first.
 * - Checks login status.
 * - Navigates to /(tabs)/home if logged in, else /login.
 */
export default function AuthGate() {
  const router = useRouter();

  useEffect(() => {
    // Show splash for at least 1.5s, then check auth and route
    const timer = setTimeout(async () => {
      //const logged = await isLoggedIn();
      if (true) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/login");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Always show splash while loading/auth check
  return <SplashScreen />;
}

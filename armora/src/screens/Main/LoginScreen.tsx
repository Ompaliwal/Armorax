import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserInput from "@/src/components/atoms/UserInput";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

// LoginScreen handles user authentication UI and logic
// Animations are handled by react-native-reanimated for smooth transitions
// Shadows are applied to static wrappers to avoid animation glitches
// All layout is responsive using useWindowDimensions
const LoginScreen = () => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.92, 420); // Responsive card width
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Accent bar with static shadow for visual separation */}
        <View style={styles.accentBarShadowWrapper}>
          <Animated.View
            entering={FadeIn.duration(900)}
            style={styles.accentBar}
          />
        </View>
        {/* Card container with static shadow wrapper for smooth animation */}
        <View style={[styles.cardShadowWrapper, { width: cardWidth }]}>
          <Animated.View
            entering={FadeInDown.duration(800)}
            style={styles.cardContainer}
          >
            <LinearGradient
              colors={["#00bf8f", "#000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.innerCard}>
                {/* Title and subtitle for context */}
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue to Armora-X
                </Text>
                {/* User input fields for login */}
                <View style={styles.inputGroup}>
                  <UserInput label="Email" type="email" />
                  <UserInput label="Password" type="password" />
                </View>
                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                {/* Login button with animation */}
                <Animated.View
                  entering={FadeInUp.duration(800).delay(200)}
                  style={{ width: "100%" }}
                >
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                      router.push("/home");
                    }}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </Animated.View>
                {/* Divider for visual separation */}
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.divider} />
                </View>
                {/* Sign up prompt for users who don't have an account */}
                <View style={styles.signupRow}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.signupLink}
                      onPress={() => router.push("/signup")}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 8,
  },
  // Shadow wrapper for accent bar
  accentBarShadowWrapper: {
    shadowColor: "#00bf8f",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 12,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 24,
  },
  accentBar: {
    width: 120,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#00bf8f",
  },
  // Shadow wrapper for card
  cardShadowWrapper: {
    shadowColor: "#00bf8f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    borderRadius: 32,
    alignSelf: "center",
    marginBottom: 12,
  },
  cardContainer: {
    width: "100%",
    borderRadius: 32,
    overflow: "hidden",
  },
  gradientBorder: {
    borderRadius: 32,
    padding: 3,
  },
  innerCard: {
    backgroundColor: "#000",
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    width: "100%",
    gap: 8, // uniform gap between input fields
    marginBottom: 6, // space after inputs before forgot password
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
    letterSpacing: 1.2,
    textAlign: "center",
  },
  subtitle: {
    color: "#00bf8f",
    fontSize: 15,
    marginBottom: 22,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 10,
  },
  forgotText: {
    color: "#00bf8f",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  loginButton: {
    marginTop: 18,
    backgroundColor: "#00bf8f",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    // No shadow here, handled by wrapper if needed
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#222",
    borderRadius: 1,
  },
  orText: {
    color: "#888",
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: "600",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  signupText: {
    color: "#aaa",
    fontSize: 15,
    fontWeight: "500",
  },
  signupLink: {
    color: "#00bf8f",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

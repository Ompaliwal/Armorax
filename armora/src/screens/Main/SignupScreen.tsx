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

// SignupScreen handles user registration UI and logic
// Animations are handled by react-native-reanimated for smooth transitions
// Shadows are applied to static wrappers to avoid animation glitches
// All layout is responsive using useWindowDimensions
const SignupScreen = () => {
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
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Sign up to get started with Armora-X
                </Text>
                {/* User input fields for registration */}
                <UserInput label="Name" type="text" />
                <UserInput label="Email" type="email" />
                <UserInput label="Password" type="password" />
                <UserInput label="Confirm Password" type="password" />
                {/* Register button with animation */}
                <Animated.View
                  entering={FadeInUp.duration(800).delay(200)}
                  style={{ width: "100%" }}
                >
                  <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => {
                      // Registration logic here
                      router.push("/login");
                    }}
                  >
                    <Text style={styles.signupButtonText}>Register</Text>
                  </TouchableOpacity>
                </Animated.View>
                {/* Divider for visual separation */}
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.divider} />
                </View>
                {/* Login prompt for users who already have an account */}
                <View style={styles.loginRow}>
                  <Text style={styles.loginText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={styles.loginLink}>Login</Text>
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

export default SignupScreen;

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
  signupButton: {
    marginTop: 18,
    backgroundColor: "#00bf8f",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    // No shadow here, handled by wrapper if needed
  },
  signupButtonText: {
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  loginText: {
    color: "#aaa",
    fontSize: 15,
    fontWeight: "500",
  },
  loginLink: {
    color: "#00bf8f",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

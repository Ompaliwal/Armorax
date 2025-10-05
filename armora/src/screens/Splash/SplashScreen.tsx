import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Animated logo */}
      <Animated.Text entering={FadeInDown.duration(900)} style={styles.logo}>
        ARMORA-X
      </Animated.Text>
      {/* Animated subtitle */}
      <Animated.Text
        entering={FadeInUp.duration(900).delay(400)}
        style={styles.subtitle}
      >
        Your Personal Cyber Security Toolkit
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 24,
  },
  logo: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#00bf8f",
    letterSpacing: 2,
    textShadowColor: "#00bf8f",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
    textTransform: "uppercase",
    marginBottom: 18,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

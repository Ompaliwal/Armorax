import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SplashScreen from "@/src/screens/Splash/SplashScreen";
import AuthGate from "./AuthGate";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <AuthGate />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});

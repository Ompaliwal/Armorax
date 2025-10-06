import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WiFiSecurity() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>WiFi Security Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});

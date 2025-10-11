import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataBreachSecurity() {
  const compromisedData = [
    { type: "Email", count: 1200 },
    { type: "Passwords", count: 300 },
    { type: "Credit Cards", count: 150 },
    { type: "Personal Info", count: 800 },
  ];

  // --- Constants for consistent design styling ---

  const ACCENT = "#00bf8f";
  const DARK_BG = "#000";
  const CARD_BG = "#151515";
  const SPACING = 18;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Data Breach Security Screen</Text>
      <View className="cardContainer">
        <View className="title-container">
          <Text style={styles.text}>Title</Text>
        </View>
        <View className="icon-container">
          <Ionicons name="shield-checkmark" color={ACCENT} size={22} />
        </View>
        <View className="description-container">
          <Text style={styles.text}>Description</Text>
        </View>
        <View className="compromised-data-container">
          <FlatList
            data={compromisedData}
            keyExtractor={(item) => item.type}
            renderItem={({ item }) => (
              <View style={styles.compromisedItem}>
                <Text style={{ color: "white" }}>{item.type}</Text>
                <Text style={{ color: "white" }}>{item.count}</Text>
              </View>
            )}
          />
        </View>
      </View>
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
  compromisedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});

// src/components/SecurityGrid.tsx
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import FeatureCard from "../atoms/FeatureCard";

const CARD_GRADIENT = ["#00bf8f", "#001510"];

const features = [
  {
    id: "1",
    label: "Scan QR Code",
    icon: <Ionicons name="qr-code-outline" size={28} color="#fff" />,
  },
  {
    id: "2",
    label: "WiFi Security",
    icon: <Ionicons name="wifi-outline" size={28} color="#fff" />,
  },
  {
    id: "3",
    label: "Scan Website",
    icon: <Feather name="globe" size={28} color="#fff" />,
  },
  {
    id: "4",
    label: "OTP Security",
    icon: <MaterialIcons name="chat-bubble-outline" size={28} color="#fff" />,
  },
  {
    id: "5",
    label: "Data Breach Security",
    icon: <Feather name="lock" size={28} color="#fff" />,
  },
  {
    id: "6",
    label: "App Permissions",
    icon: <Ionicons name="logo-android" size={28} color="#fff" />,
  },
];

export default function SecurityGrid() {
  return (
    <FlatList
      data={features}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FeatureCard
          icon={item.icon}
          label={item.label}
          gradientColors={CARD_GRADIENT}
          style={styles.card}
          onPress={() => console.log(`${item.label} pressed`)}
        />
      )}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 100,
    height: 120,
    margin: 5,
  },
});

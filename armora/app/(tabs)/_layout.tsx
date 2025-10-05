import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#00bf8f",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0,
            paddingBottom: 10,
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="home-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="person-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
          }}
        />
        {/* Optionally add login/signup as hidden tabs for navigation if needed */}
      </Tabs>
    </View>
  );
}

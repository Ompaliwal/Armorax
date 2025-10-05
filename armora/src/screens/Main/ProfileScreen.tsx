import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Linking,
  AccessibilityInfo,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const SPACING = 18;

/**
 * ProfileScreen displays the user's profile info, actions, and legal links.
 * Animations are used for a modern, engaging feel.
 * All interactive elements are accessible and have clear labels.
 * Shadows are applied to static wrappers to avoid animation glitches.
 * Layout is responsive using useWindowDimensions.
 */
const ProfileScreen = () => {
  const { width } = useWindowDimensions();
  const maxContentWidth = Math.min(width * 0.96, 420);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          padding: SPACING,
          backgroundColor: "black", // Ensure parent is black
        }}
      >
        {/* App Title and Tagline (animated) */}
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={[styles.titleShadowWrapper, { backgroundColor: "black" }]}
        >
          <View
            style={[
              styles.titleContainer,
              { maxWidth: maxContentWidth, backgroundColor: "#000" },
            ]}
          >
            <Text style={styles.labelMain}>Armora-X</Text>
            <Text style={styles.subText}>
              Next-gen security, powered by AI. Stay protected, stay ahead.
            </Text>
          </View>
        </Animated.View>

        {/* Profile Info Section (animated) */}
        <Animated.View
          entering={FadeIn.duration(800)}
          style={[
            styles.profileSection,
            { maxWidth: maxContentWidth, backgroundColor: "#000" },
          ]}
        >
          <Text style={styles.statusText}>Welcome</Text>
          <View style={styles.profileCircle}>
            <Ionicons
              name="person-sharp"
              color="black"
              size={70}
              accessibilityLabel="Profile Icon"
            />
          </View>
          <View style={styles.profileText}>
            {/* Username and email, replace with dynamic data as needed */}
            <Text
              style={{
                color: "white",
                fontSize: 22,
                marginTop: 6,
                fontWeight: "bold",
              }}
              accessibilityRole="text"
            >
              UserName
            </Text>
            <Text
              style={{ color: "gray", fontSize: 15, marginTop: 4 }}
              accessibilityRole="text"
            >
              user@example.com
            </Text>
          </View>
        </Animated.View>

        {/* Main Actions Section (animated) */}
        <Animated.View
          entering={FadeInDown.duration(700)}
          style={[styles.actionsShadowWrapper, { backgroundColor: "black" }]}
        >
          <View
            style={[
              styles.actionsSection,
              { maxWidth: maxContentWidth, backgroundColor: "#000" },
            ]}
          >
            {/* Contact Us: opens mail client */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Linking.openURL("mailto:support@yourdomain.com")}
              accessibilityRole="button"
              accessibilityLabel="Contact Us. Opens your email app."
            >
              <Ionicons name="mail" color="#00bf8f" size={22} />
              <Text style={styles.actionText}>Contact Us</Text>
            </TouchableOpacity>
            {/* Log Out: add logic as needed */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                /* Add your logout logic here */
              }}
              accessibilityRole="button"
              accessibilityLabel="Log Out"
            >
              <Ionicons name="log-out" color="#00bf8f" size={22} />
              <Text style={styles.actionText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer: Legal Links (animated) */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(700)}
          style={[
            styles.footerSection,
            { maxWidth: maxContentWidth, backgroundColor: "#000" },
          ]}
        >
          {/* Privacy Policy: opens website */}
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>
              Linking.openURL("https://yourdomain.com/privacy-policy")
            }
            accessibilityRole="link"
            accessibilityLabel="Privacy Policy. Opens in browser."
          >
            <Ionicons name="document-text-sharp" color="#00bf8f" size={18} />
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
          {/* Terms of Service: opens website */}
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>
              Linking.openURL("https://yourdomain.com/terms-of-service")
            }
            accessibilityRole="link"
            accessibilityLabel="Terms of Service. Opens in browser."
          >
            <Ionicons name="shield-checkmark" color="#00bf8f" size={18} />
            <Text style={styles.footerText}>Terms of Service</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// --- Styles ---
const styles = StyleSheet.create({
  // Shadow wrapper for title (for future shadow needs)
  titleShadowWrapper: {
    // Example: add shadowColor, shadowOffset, etc. if needed
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 0,
    paddingHorizontal: 10,
    maxWidth: 400,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    gap: 10,
  },
  profileCircle: {
    overflow: "hidden",
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#00bf8f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  subText: {
    marginTop: 6,
    lineHeight: 18,
    textAlign: "center",
    fontSize: 13,
    color: "#fff",
    opacity: 0.7,
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  profileText: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelMain: {
    textAlign: "center",
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bf8f",
    letterSpacing: 2,
    textShadowColor: "#00bf8f",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
    textTransform: "uppercase",
  },
  statusText: {
    color: "#00bf8f",
    fontSize: 13,
    marginTop: 10,
    fontWeight: "600",
    letterSpacing: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  // Shadow wrapper for actions (for future shadow needs)
  actionsShadowWrapper: {
    // Example: add shadowColor, shadowOffset, etc. if needed
  },
  actionsSection: {
    gap: 16,
    alignItems: "center",
    width: "100%",
    marginVertical: 0,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181818",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginBottom: 0,
    width: 260,
    justifyContent: "center",
    gap: 12,
  },
  actionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  footerSection: {
    alignItems: "center",
    gap: 8,
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#111",
    borderRadius: 10,
    marginHorizontal: 6,
  },
  footerText: {
    color: "#aaa",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

export default function ScanQRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [securityLevel, setSecurityLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#00bf8f" size="large" />
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.openBtn}>
          <Text style={styles.openBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScanResult(data);
    setLoading(true);
    setTimeout(() => {
      if (data.startsWith("https://") || data.startsWith("http://")) {
        setSecurityLevel("Safe Link");
      } else if (data.match(/^[0-9]+$/)) {
        setSecurityLevel("Numeric Code (Low Risk)");
      } else {
        setSecurityLevel("Unknown/Check Carefully");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!scanned ? (
        <View style={styles.scannerWrapper}>
          <Animated.Text style={styles.heading}>Scan a QR Code</Animated.Text>
          <CameraView
            style={styles.scanner}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          <Animated.Text style={styles.infoText}>
            Point your camera at a QR code to assess its security instantly.
          </Animated.Text>
        </View>
      ) : (
        <View style={styles.resultWrapper}>
          <Ionicons
            name="shield-checkmark"
            size={48}
            color="#00bf8f"
            style={{ marginBottom: 16 }}
          />
          <Animated.Text style={styles.resultLabel}>Scan Result:</Animated.Text>
          <Animated.Text style={styles.resultText}>{scanResult}</Animated.Text>
          {loading ? (
            <ActivityIndicator
              color="#00bf8f"
              size="large"
              style={{ marginVertical: 16 }}
            />
          ) : (
            <Animated.Text style={styles.securityLevel}>{securityLevel}</Animated.Text>
          )}
          {scanResult && scanResult.startsWith("http") && !loading && (
            <TouchableOpacity
              style={styles.openBtn}
              onPress={() => Linking.openURL(scanResult)}
            >
              <Ionicons name="open-outline" size={20} color="#fff" />
              <Animated.Text style={styles.openBtnText}>Open Link</Animated.Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.rescanBtn}
            onPress={() => {
              setScanned(false);
              setScanResult(null);
              setSecurityLevel(null);
            }}
          >
            <Ionicons name="refresh" size={20} color="#00bf8f" />
            <Animated.Text style={styles.rescanBtnText}>Scan Another</Animated.Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  scannerWrapper: {
    width: "100%",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    letterSpacing: 1.1,
  },
  scanner: {
    width: 260,
    height: 260,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
  },
  infoText: {
    color: "#aaa",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
  resultWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 16,
  },
  resultLabel: {
    color: "#aaa",
    fontSize: 15,
    marginBottom: 6,
  },
  resultText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  securityLevel: {
    color: "#00bf8f",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00bf8f",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  openBtnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
  rescanBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    padding: 8,
  },
  rescanBtnText: {
    color: "#00bf8f",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
  text: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 16 },
});

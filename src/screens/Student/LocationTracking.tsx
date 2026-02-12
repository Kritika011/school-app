import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function StudentBusTracking() {
  const [busLocation, setBusLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  /* 🔁 Simulated live movement (replace with API / Socket) */
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation(prev => ({
        latitude: prev.latitude + 0.0001,
        longitude: prev.longitude + 0.0001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      {/* ================= MAP ================= */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: busLocation.latitude,
          longitude: busLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 🚌 Bus Marker */}
        <Marker coordinate={busLocation}>
          <View style={styles.busMarker}>
            <Ionicons name="bus" size={24} color="#fff" />
          </View>
        </Marker>
      </MapView>

      {/* ================= BUS INFO CARD ================= */}
      <LinearGradient
        colors={["#051e3b", "#3d649a", "#6091d1"]}
        style={styles.infoCard}
      >
        <View>
          <Text style={styles.title}>Bus No: 12</Text>
          <Text style={styles.sub}>Driver: Ramesh Kumar</Text>
          <Text style={styles.sub}>Route: Sector 5 → School</Text>
        </View>

        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call-outline" size={20} color="#0e3e79" />
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </LinearGradient>

    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  map: {
    flex: 1,
  },

  busMarker: {
    backgroundColor: "#0e3e79",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },

  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sub: {
    color: "#e3f2fd",
    fontSize: 13,
    marginTop: 2,
  },

  callBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  callText: {
    color: "#0e3e79",
    fontWeight: "bold",
    marginLeft: 6,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function StudentDashboard() {
  const [busOn, setBusOn] = useState(true);

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ================= HEADER CONTENT ================= */}
        <View style={styles.header}>
          <Text style={styles.school}>ABC PUBLIC SCHOOL</Text>
          <Text style={styles.name}>Kritika Pramanik</Text>
          <Text style={styles.meta}>Class 10-A • Roll No 23</Text>
        </View>

        {/* ================= BUS TOGGLE ================= */}
        <View style={styles.toggleCard}>
          <View>
            <Text style={styles.toggleTitle}>Bus Service</Text>
            <Text style={styles.toggleSub}>
              Status: {busOn ? "ON (Tracking Enabled)" : "OFF"}
            </Text>
          </View>

          <Switch
            value={busOn}
            onValueChange={setBusOn}
            trackColor={{ false: "#ccc", true: "#6091d1" }}
            thumbColor={busOn ? "#051e3b" : "#f4f3f4"}
          />
        </View>

        {/* ================= FEATURES ================= */}
        <View style={styles.grid}>
          <FeatureCard icon="calendar-outline" label="Attendance" />
          <FeatureCard icon="bus-outline" label="Bus Location" />
          <FeatureCard icon="document-text-outline" label="Results" />
          <FeatureCard icon="person-outline" label="Profile" />
        </View>

        {/* ================= BUS CARD ================= */}
        {busOn && (
          <View style={styles.busCard}>
            <Ionicons name="location-outline" size={26} color="#fff" />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.busTitle}>Live Bus Tracking</Text>
              <Text style={styles.busSub}>
                Bus No: 12 • Driver: Ramesh
              </Text>
            </View>

            <TouchableOpacity style={styles.trackBtn}>
              <Text style={styles.trackText}>TRACK</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </LinearGradient>
  );
}

/* ================= COMPONENT ================= */

const FeatureCard = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.iconWrap}>
      <Ionicons name={icon} size={28} color="#0e3e79" />
    </View>
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    padding: 24,
  },
  school: {
    color: "#cfd8dc",
    fontSize: 13,
    letterSpacing: 1,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
  },
  meta: {
    color: "#e3f2fd",
    marginTop: 4,
  },

  toggleCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051e3b",
  },
  toggleSub: {
    fontSize: 12,
    color: "#7a8fa6",
    marginTop: 2,
  },

  grid: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(96,145,209,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2d3d",
  },

  busCard: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    flexDirection: "row",
    alignItems: "center",
  },
  busTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  busSub: {
    color: "#e3f2fd",
    fontSize: 12,
  },
  trackBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  trackText: {
    color: "#0e3e79",
    fontWeight: "bold",
  },
});

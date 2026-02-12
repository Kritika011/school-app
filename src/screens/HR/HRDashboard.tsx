import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HRDashboardAdvanced() {
  const StatCard = ({ icon, label, value }: any) => (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={26} color="#7db4ff" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const ActionButton = ({ icon, label, badge }: any) => (
    <TouchableOpacity style={styles.actionBtn}>
      <Ionicons name={icon} size={24} color="#7db4ff" />
      <Text style={styles.actionText}>{label}</Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#104683", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
       

        {/* STATS */}
        <View style={styles.statsRow}>
          <StatCard icon="people" label="Total Staff" value="124" />
          <StatCard icon="school" label="Teachers" value="78" />
        </View>

        <View style={styles.statsRow}>
          <StatCard icon="briefcase" label="Non-Teaching" value="46" />
          <StatCard icon="calendar" label="Attendance" value="92%" />
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <ActionButton icon="person-add" label="Add Staff" />
          <ActionButton icon="person-add" label="Add Student" />
          <ActionButton icon="document-text" label="Leave" badge={4} />
          <ActionButton icon="calendar" label="Attendance" />
          <ActionButton icon="cash" label="Payroll" />
          <ActionButton icon="megaphone" label="Announcements" />
        </View>

        {/* LEAVE REQUESTS */}
        <Text style={styles.sectionTitle}>Pending Leave Requests</Text>
        <View style={styles.card}>
          <View>
            <Text style={styles.cardText}>Anjali Sharma</Text>
            <Text style={styles.cardSub}>Casual Leave · Teacher</Text>
          </View>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.approve}>
              <Ionicons name="checkmark" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.reject}>
              <Ionicons name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BIRTHDAYS */}
        <Text style={styles.sectionTitle}>Today’s Birthdays 🎂</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Rahul Verma</Text>
          <Text style={styles.cardSub}>Mathematics Teacher</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 , },

  // notifyBadge: {
  //   position: "absolute",
  //   top: -6,
  //   right: -6,
  //   backgroundColor: "#ef4444",
  //   borderRadius: 10,
  //   paddingHorizontal: 60,
  // },
  badgeText: { color: "#fff", fontSize: 11 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#0f2f55",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 6,
  },
  statLabel: { fontSize: 12, color: "#c7d8f0" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 14,
    color: "#fff",
  },

  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionBtn: {
    width: "48%",
    backgroundColor: "#143d6b",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    marginTop: 6,
    fontSize: 14,
    color: "#fff",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "#facc15",
    borderRadius: 10,
    paddingHorizontal: 6,
  },

  card: {
    backgroundColor: "#0f2f55",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: { fontSize: 15, fontWeight: "600", color: "#fff" },
  cardSub: { fontSize: 12, color: "#c7d8f0", marginTop: 4 },

  actionIcons: { flexDirection: "row" },
  approve: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  reject: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 12,
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";


export default function LibrarianDashboard() {
  type StatCardProps = {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    value: string;
  };

  const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={26} color="#072445" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Stats */}
        <View style={styles.statsWrap}>
          <StatCard icon="book" label="Total Books" value="4,820" />
          <StatCard icon="people" label="Members" value="1,260" />
          <StatCard icon="arrow-up-circle" label="Issued Today" value="36" />
          <StatCard icon="alert-circle" label="Overdue Books" value="12" />
        </View>

        {/* Actions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.action}>
            <Ionicons name="add-circle-outline" size={22} color="#406ead" />
            <Text style={styles.actionText}>Add New Book</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <Ionicons name="swap-horizontal-outline" size={22} color="#406ead" />
            <Text style={styles.actionText}>Issue / Return Book</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <Ionicons name="search-outline" size={22} color="#406ead" />
            <Text style={styles.actionText}>Search Book or Student</Text>
          </TouchableOpacity>
        </View>

        {/* Overdue */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overdue Alerts</Text>
          <Text style={styles.muted}>
            12 books pending return. Immediate action required.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // top: {
  //   padding: 24,
  // },
  welcome: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  date: {
    color: "#e6efff",
    marginTop: 6,
  },
  statsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    color: "#777",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  muted: {
    color: "#666",
  },
});

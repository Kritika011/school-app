import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- TYPES ---------- */

type StatCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
};

type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

type ScheduleRowProps = {
  time: string;
  subject: string;
};

/* ---------- MAIN COMPONENT ---------- */

const TeacherDashboard: React.FC = () => {
  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome 👋</Text>
            <Text style={styles.name}>Ms. Kritika</Text>
            <Text style={styles.subtitle}>Class Teacher • Grade 6</Text>
          </View>

          <Ionicons name="person-circle-outline" size={64} color="#fff" />
        </View>

        {/* ---------- STATS ---------- */}
        <View style={styles.statsRow}>
          <StatCard icon="people" label="Students" value="38" color="#4caf50" />
          <StatCard icon="school" label="Classes" value="6" color="#ff9800" />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="checkmark-done"
            label="Attendance"
            value="96%"
            color="#2196f3"
          />
          <StatCard
            icon="notifications"
            label="Notices"
            value="4"
            color="#f44336"
          />
        </View>

        {/* ---------- QUICK ACTIONS ---------- */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          <ActionButton icon="clipboard" label="Mark Attendance" />
          <ActionButton icon="document-text" label="Assignments" />
          <ActionButton icon="chatbubbles" label="Messages" />
          <ActionButton icon="megaphone" label="Announcements" />
        </View>

        {/* ---------- TODAY'S SCHEDULE ---------- */}
        <Text style={styles.sectionTitle}>Today's Classes</Text>

        <View style={styles.card}>
          <ScheduleRow time="09:00 - 09:45" subject="Mathematics" />
          <ScheduleRow time="10:00 - 10:45" subject="Science" />
          <ScheduleRow time="11:30 - 12:15" subject="English" />
        </View>

        {/* ---------- NOTICE BOARD ---------- */}
        <Text style={styles.sectionTitle}>Notice Board</Text>

        <View style={styles.noticeCard}>
          <Ionicons name="alert-circle" size={24} color="#ff9800" />
          <Text style={styles.noticeText}>
            Parent-Teacher meeting on Friday at 10 AM.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default TeacherDashboard;

/* ---------- SUB COMPONENTS ---------- */

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color,
}) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={28} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Ionicons name={icon} size={26} color="#0e3e79" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const ScheduleRow: React.FC<ScheduleRowProps> = ({ time, subject }) => (
  <View style={styles.scheduleRow}>
    <Text style={styles.scheduleTime}>{time}</Text>
    <Text style={styles.scheduleSubject}>{subject}</Text>
  </View>
);

/* ---------- STYLES ---------- */

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  statsRow: ViewStyle;
  statCard: ViewStyle;
  actionGrid: ViewStyle;
  actionBtn: ViewStyle;
  card: ViewStyle;
  scheduleRow: ViewStyle;
  noticeCard: ViewStyle;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "#dbe9ff",
    fontSize: 14,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#e0ecff",
    fontSize: 14,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
    color: "#ffffff",
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  actionBtn: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  scheduleTime: {
    fontSize: 14,
    color: "#555",
  },

  scheduleSubject: {
    fontSize: 15,
    fontWeight: "600",
    color: "#051e3b",
  },

  noticeCard: {
    backgroundColor: "#fff7e6",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 2,
  },

  noticeText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});

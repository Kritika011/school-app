import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface RoutineItem {
  time: string;
  subject: string;
}

interface RoutineData {
  [key: string]: RoutineItem[];
}

const routineData: RoutineData = {
  Monday: [
    { time: "09:00 - 09:45", subject: "Maths" },
    { time: "09:45 - 10:30", subject: "English" },
    { time: "10:45 - 11:30", subject: "Science" },
  ],
  Tuesday: [
    { time: "09:00 - 09:45", subject: "Social" },
    { time: "09:45 - 10:30", subject: "Maths" },
    { time: "10:45 - 11:30", subject: "Computer" },
  ],
  Wednesday: [
    { time: "09:00 - 09:45", subject: "English" },
    { time: "09:45 - 10:30", subject: "Science" },
    { time: "10:45 - 11:30", subject: "Maths" },
  ],
};

export default function StudentRoutine() {
  const [viewMode, setViewMode] = useState<"table" | "list">("table");

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.title}>Class Routine</Text>

        <View style={styles.toggle}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === "table" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("table")}
          >
            <Ionicons name="grid-outline" size={18} color="#fff" />
            <Text style={styles.toggleText}>Table</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === "list" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("list")}
          >
            <Ionicons name="list-outline" size={18} color="#fff" />
            <Text style={styles.toggleText}>List</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {viewMode === "table" ? <TableView /> : <ListView />}
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= TABLE VIEW ================= */

const TableView = () => (
  <View style={styles.table}>
    {Object.keys(routineData).map((day) => (
      <View key={day} style={styles.tableDay}>
        <Text style={styles.dayTitle}>{day}</Text>

        {routineData[day].map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

/* ================= LIST VIEW ================= */

const ListView = () => (
  <View>
    {Object.keys(routineData).map((day) => (
      <View key={day} style={styles.listCard}>
        <Text style={styles.dayTitle}>{day}</Text>

        {routineData[day].map((item, index) => (
          <View key={index} style={styles.listRow}>
            <Ionicons name="time-outline" size={18} color="#0e3e79" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    ))}
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  toggle: {
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    overflow: "hidden",
  },
  toggleBtn: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  toggleText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 16,
  },

  table: {
    marginTop: 10,
  },
  tableDay: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  listCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#051e3b",
  },
  subject: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2d3d",
  },
  time: {
    fontSize: 12,
    color: "#6b7c93",
  },
});

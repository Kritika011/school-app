import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- TYPES ---------- */
type Period = {
  id: number;
  startTime: string;
  endTime: string;
  subject: string;
};

type DayRoutine = {
  id: number;
  day: string;
  periods: Period[];
};

/* ---------- DUMMY DATA ---------- */
const ROUTINE_DATA: DayRoutine[] = [
  {
    id: 1,
    day: "Monday",
    periods: [
      { id: 1, startTime: "09:00", endTime: "09:45", subject: "Math" },
      { id: 2, startTime: "09:45", endTime: "10:30", subject: "English" },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    periods: [
      { id: 1, startTime: "09:00", endTime: "09:45", subject: "Science" },
      { id: 2, startTime: "09:45", endTime: "10:30", subject: "History" },
    ],
  },
];

/* ---------- SCREEN ---------- */
export default function TeacherRoutineViewScreen() {
  const [viewType, setViewType] = useState<"list" | "table">("list");

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1"]}
      style={styles.container}
    >
      {/* ---------- HEADER ---------- */}
      <Text style={styles.title}>Class Routine</Text>

      {/* ---------- CLASS INFO ---------- */}
      <View style={styles.infoCard}>
        <InfoItem label="Class" value="10" />
        <InfoItem label="Section" value="A" />
        <InfoItem label="Session" value="2025 - 26" />
      </View>

      {/* ---------- VIEW TOGGLE ---------- */}
      <View style={styles.toggleRow}>
        <ToggleButton
          active={viewType === "list"}
          icon="list"
          label="List View"
          onPress={() => setViewType("list")}
        />
        <ToggleButton
          active={viewType === "table"}
          icon="grid"
          label="Table View"
          onPress={() => setViewType("table")}
        />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {viewType === "list" ? <ListView /> : <TableView />}
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- LIST VIEW ---------- */
function ListView() {
  return (
    <>
      {ROUTINE_DATA.map((day) => (
        <View key={day.id} style={styles.dayCard}>
          <Text style={styles.dayTitle}>{day.day}</Text>

          {day.periods.map((p, index) => (
            <View key={p.id} style={styles.periodRow}>
              <Text style={styles.periodNo}>{index + 1}</Text>

              <View style={{ flex: 1 }}>
                <Text style={styles.subject}>{p.subject}</Text>
                <Text style={styles.time}>
                  {p.startTime} - {p.endTime}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

/* ---------- TABLE VIEW ---------- */
function TableView() {
  return (
    <View style={styles.tableCard}>
      {/* Table Header */}
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={styles.tableHeadCell}>Day</Text>
        <Text style={styles.tableHeadCell}>Time</Text>
        <Text style={styles.tableHeadCell}>Subject</Text>
      </View>

      {/* Table Body */}
      {ROUTINE_DATA.map((day) =>
        day.periods.map((p, index) => (
          <View key={`${day.id}-${p.id}`} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {index === 0 ? day.day : ""}
            </Text>
            <Text style={styles.tableCell}>
              {p.startTime} - {p.endTime}
            </Text>
            <Text style={styles.tableCell}>{p.subject}</Text>
          </View>
        ))
      )}
    </View>
  );
}

/* ---------- SMALL COMPONENTS ---------- */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ToggleButton({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean;
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.toggleBtn, active && styles.toggleActive]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={active ? "#fff" : "#051e3b"}
      />
      <Text
        style={[
          styles.toggleText,
          { color: active ? "#fff" : "#051e3b" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#777",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#051e3b",
  },

  toggleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  toggleBtn: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  toggleActive: {
    backgroundColor: "#051e3b",
  },

  toggleText: {
    fontWeight: "700",
  },

  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },

  dayTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#051e3b",
    marginBottom: 8,
  },

  periodRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  periodNo: {
    width: 24,
    fontWeight: "700",
  },

  subject: {
    fontSize: 15,
    fontWeight: "600",
  },

  time: {
    fontSize: 13,
    color: "#555",
  },

  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },

  tableHeader: {
    backgroundColor: "#051e3b",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  tableHeadCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },
});

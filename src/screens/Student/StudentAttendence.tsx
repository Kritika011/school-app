import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";

export default function StudentAttendance() {

  // Example attendance data
  const attendanceData = {
    "2026-01-02": { selected: true, selectedColor: "#4CAF50" }, // Present
    "2026-01-05": { selected: true, selectedColor: "#f44336" }, // Absent
    "2026-01-10": { selected: true, selectedColor: "#f4c430" }, // Holiday
    "2026-01-15": { selected: true, selectedColor: "#4CAF50" },
    "2026-01-20": { selected: true, selectedColor: "#f44336" },
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Student Attendance</Text>

        {/* Student Info Card */}
        <View style={styles.card}>
          <Text style={styles.name}>RAM SEN</Text>
          <Text style={styles.meta}>Class 7 • Sec B</Text>
          <Text style={styles.meta}>Session 2025–2026</Text>
          <Text style={styles.roll}>Roll: 104</Text>
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          {legendBox("#4CAF50", "Present")}
          {legendBox("#f44336", "Absent")}
          {legendBox("#f4c430", "Holiday")}
        </View>

        {/* Real Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={"2026-01-01"}
            markedDates={attendanceData}
            markingType="dot"
            theme={{
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#0e3e79",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#0e3e79",
              arrowColor: "#0e3e79",
              monthTextColor: "#0e3e79",
              textDayFontWeight: "600",
              textMonthFontWeight: "700",
            }}
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const legendBox = (color: string, label: string) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <View style={[styles.legendColor, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0e3e79",
  },

  meta: {
    fontSize: 12,
    color: "#555",
  },

  roll: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "700",
    color: "#0e3e79",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },

  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 6,
  },

  legendText: {
    color: "#fff",
    fontSize: 12,
  },

  calendarContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function StudentResult() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const exams = [
    {
      title: "Midterm Examination",
      percentage: 78,
      subjects: [
        { name: "Mathematics", marks: 80 },
        { name: "English", marks: 72 },
        { name: "Science", marks: 82 },
      ],
    },
    {
      title: "Final Examination",
      percentage: 85,
      subjects: [
        { name: "Mathematics", marks: 88 },
        { name: "English", marks: 80 },
        { name: "Science", marks: 87 },
      ],
    },
  ];

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getGrade = (percent: number) => {
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B";
    if (percent >= 60) return "C";
    return "D";
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Text style={styles.pageTitle}>Student Result</Text>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.studentName}>ABC XYZ</Text>
          <Text style={styles.meta}>Class 6 • Roll 12</Text>

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.bigPercent}>82%</Text>
              <Text style={styles.smallText}>Overall Percentage</Text>
            </View>

            <View style={styles.gradeBox}>
              <Text style={styles.gradeText}>A</Text>
              <Text style={styles.smallText}>Grade</Text>
            </View>
          </View>
        </View>

        {/* Exam Sections */}
        {exams.map((exam, index) => (
          <View key={index} style={styles.examCard}>
            <TouchableOpacity
              style={styles.examHeader}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.examTitle}>{exam.title}</Text>
              <Ionicons
                name={
                  expandedIndex === index
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={22}
                color="#0e3e79"
              />
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={styles.subjectContainer}>
                <Text style={styles.examPercent}>
                  Percentage: {exam.percentage}% ({getGrade(exam.percentage)})
                </Text>

                {exam.subjects.map((sub, i) => (
                  <View key={i} style={styles.subjectCard}>
                    <View style={styles.subjectHeader}>
                      <Text style={styles.subjectName}>{sub.name}</Text>
                      <Text style={styles.subjectMarks}>
                        {sub.marks} / 100
                      </Text>
                    </View>

                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${sub.marks}%` },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0e3e79",
  },

  meta: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bigPercent: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0e3e79",
  },

  smallText: {
    fontSize: 12,
    color: "#666",
  },

  gradeBox: {
    alignItems: "center",
    backgroundColor: "#f2f5f9",
    padding: 12,
    borderRadius: 16,
  },

  gradeText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0e3e79",
  },

  examCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },

  examHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  examTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0e3e79",
  },

  subjectContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  examPercent: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  subjectCard: {
    marginBottom: 14,
  },

  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  subjectMarks: {
    fontSize: 13,
    color: "#555",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginTop: 6,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#0e3e79",
    borderRadius: 8,
  },
});

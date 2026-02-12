import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

/* ---------- TYPES ---------- */

type Student = {
  id: string;
  name: string;
  rollNo: string;
  present: boolean;
};

type ClassOption = {
  id: string;
  label: string;
};

type Props = NativeStackScreenProps<any>;

/* ---------- DUMMY DATA ---------- */

const classes: ClassOption[] = [
  { id: "1", label: "Class 6 - A" },
  { id: "2", label: "Class 6 - B" },
];

const studentsData: Student[] = [
  { id: "1", name: "Aarav Sharma", rollNo: "01", present: true },
  { id: "2", name: "Ananya Verma", rollNo: "02", present: true },
  { id: "3", name: "Rohan Das", rollNo: "03", present: true },
  { id: "4", name: "Ishita Sen", rollNo: "04", present: true },
];

/* ---------- MAIN COMPONENT ---------- */

const TeacherAttendanceScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedClass, setSelectedClass] = useState<ClassOption>(classes[0]);
  const [students, setStudents] = useState<Student[]>(studentsData);

  const toggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, present: true })));
  };

  const submitAttendance = () => {
    const payload = students.map((s) => ({
      studentId: s.id,
      present: s.present,
    }));

    console.log("Attendance submitted:", payload);
    alert("Attendance submitted successfully ✅");
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mark Attendance</Text>
            <Text style={styles.date}>
              {new Date().toDateString()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() =>
              navigation.navigate("TeacherAttendanceList")
            }
          >
            <Ionicons
              name="time-outline"
              size={22}
              color="#0e3e79"
            />
          </TouchableOpacity>
        </View>

        {/* ---------- CLASS SELECT ---------- */}
        <View style={styles.classRow}>
          {classes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.classBtn,
                selectedClass.id === item.id && styles.activeClass,
              ]}
              onPress={() => setSelectedClass(item)}
            >
              <Text
                style={[
                  styles.classText,
                  selectedClass.id === item.id &&
                    styles.activeClassText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- MARK ALL ---------- */}
        <TouchableOpacity
          style={styles.markAllBtn}
          onPress={markAllPresent}
        >
          <Ionicons
            name="checkmark-done"
            size={20}
            color="#0e3e79"
          />
          <Text style={styles.markAllText}>Mark All Present</Text>
        </TouchableOpacity>

        {/* ---------- STUDENT LIST ---------- */}
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Text style={styles.studentName}>
                {item.rollNo}. {item.name}
              </Text>

              <TouchableOpacity
                style={[
                  styles.statusBtn,
                  item.present ? styles.present : styles.absent,
                ]}
                onPress={() => toggleAttendance(item.id)}
              >
                <Text style={styles.statusText}>
                  {item.present ? "Present" : "Absent"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* ---------- SUBMIT ---------- */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={submitAttendance}
        >
          <Text style={styles.submitText}>
            Submit Attendance
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TeacherAttendanceScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  date: {
    fontSize: 14,
    color: "#e6ecff",
    marginTop: 4,
  },

  historyBtn: {
    backgroundColor: "#e3efff",
    padding: 10,
    borderRadius: 12,
  },

  classRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  classBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },

  activeClass: {
    backgroundColor: "#0e3e79",
  },

  classText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  activeClassText: {
    color: "#fff",
  },

  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3efff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },

  markAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0e3e79",
  },

  studentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  studentName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  present: {
    backgroundColor: "#d4edda",
  },

  absent: {
    backgroundColor: "#f8d7da",
  },

  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  submitBtn: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#0e3e79",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ---------- TYPES ---------- */
type Student = {
  id: string;
  rollNo: string;
  name: string;
};

/* ---------- DUMMY STUDENTS ---------- */
const STUDENTS: Student[] = [
  { id: "1", rollNo: "01", name: "Ram Sen" },
  { id: "2", rollNo: "02", name: "Sena Das" },
  { id: "3", rollNo: "03", name: "Priya Mallick" },
  { id: "4", rollNo: "04", name: "Abc Abc" },
  { id: "5", rollNo: "05", name: "Abc Abc" },
  { id: "6", rollNo: "06", name: "Abc Abc" },
];

/* ---------- SCREEN ---------- */
export default function TeacherStudentResultList() {
  const navigation = useNavigation<any>();

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("2025-26");
  const [examType, setExamType] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  /* ---------- FIND STUDENTS ---------- */
  const findStudents = () => {
    // API CALL WILL COME HERE
    setStudents(STUDENTS);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
     
      {/* ---------- FILTER CARD ---------- */}
      <View style={styles.filterCard}>
        <View style={styles.row}>
          <TextInput
            placeholder="Class"
            style={styles.input}
            value={className}
            onChangeText={setClassName}
          />
          <TextInput
            placeholder="Section"
            style={styles.input}
            value={section}
            onChangeText={setSection}
          />
        </View>

        <TextInput
          placeholder="Session"
          style={styles.inputFull}
          value={session}
          onChangeText={setSession}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Exam type"
            style={styles.inputFull}
            value={examType}
            onChangeText={setExamType}
          />
          <TouchableOpacity style={styles.findBtn} onPress={findStudents}>
            <Text style={styles.findText}>Find</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- SEARCH ---------- */}
      {students.length > 0 && (
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" />
          <TextInput
            placeholder="Search student"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="filter" size={18} color="#555" />
        </View>
      )}

      {/* ---------- STUDENT LIST ---------- */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.studentRow}>
            <Text style={styles.roll}>{item.rollNo}</Text>
            <Text style={styles.name}>{item.name}</Text>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                navigation.navigate("TeacherAddResult", {
                  studentId: item.id,
                  studentName: item.name,
                  rollNo: item.rollNo,
                  className,
                  section,
                  session,
                  examType,
                })
              }
            >
              <Text style={styles.viewText}>View Result</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  header: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  admin: {
    fontWeight: "700",
  },

  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },

  inputFull: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    flex: 1,
  },

  findBtn: {
    backgroundColor: "#1c215e",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 8,
  },

  findText: {
    color: "#fff",
    fontWeight: "700",
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },

  searchInput: {
    flex: 1,
  },

  studentRow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  roll: {
    width: 30,
    fontWeight: "700",
  },

  name: {
    flex: 1,
  },

  viewBtn: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  viewText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

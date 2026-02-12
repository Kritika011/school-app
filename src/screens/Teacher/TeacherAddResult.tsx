import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";

/* ---------- TYPES ---------- */
type SubjectResult = {
  id: number;
  subject: string;
  theoryMarks: string;
  theoryFull: string;
  practicalMarks: string;
  practicalFull: string;
};

/* ---------- ROUTE PARAMS ---------- */
type RouteParams = {
  TeacherAddResult: {
    studentId: string;
    studentName: string;
    rollNo: string;
    className: string;
    section: string;
    session: string;
    examType: string;
  };
};

/* ---------- SCREEN ---------- */
export default function TeacherAddResult() {
  const route = useRoute<RouteProp<RouteParams, "TeacherAddResult">>();
  const navigation = useNavigation<any>();

  const {
    studentName,
    rollNo,
    className,
    section,
    session,
    examType,
  } = route.params;

  const [subjects, setSubjects] = useState<SubjectResult[]>([
    {
      id: Date.now(),
      subject: "",
      theoryMarks: "",
      theoryFull: "100",
      practicalMarks: "",
      practicalFull: "0",
    },
  ]);

  /* ---------- ADD SUBJECT ---------- */
  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        subject: "",
        theoryMarks: "",
        theoryFull: "100",
        practicalMarks: "",
        practicalFull: "0",
      },
    ]);
  };

  /* ---------- REMOVE SUBJECT ---------- */
  const removeSubject = (id: number) => {
    if (subjects.length === 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  /* ---------- UPDATE FIELD ---------- */
  const updateField = (
    id: number,
    key: keyof SubjectResult,
    value: string
  ) => {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, [key]: value } : s
      )
    );
  };

  /* ---------- TOTAL ---------- */
  const getTotal = (s: SubjectResult) => {
    const tm = Number(s.theoryMarks || 0);
    const pm = Number(s.practicalMarks || 0);
    const tf = Number(s.theoryFull || 0);
    const pf = Number(s.practicalFull || 0);

    return {
      obtained: tm + pm,
      full: tf + pf,
    };
  };

  /* ---------- GRADE ---------- */
  const getGrade = (obtained: number, full: number) => {
    const percent = (obtained / full) * 100;
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B+";
    if (percent >= 60) return "B";
    return "C";
  };

  /* ---------- SAVE ---------- */
  const saveResult = () => {
    const payload = {
      studentName,
      rollNo,
      className,
      section,
      session,
      examType,
      results: subjects.map((s) => {
        const total = getTotal(s);
        return {
          subject: s.subject,
          theoryMarks: s.theoryMarks,
          practicalMarks: s.practicalMarks,
          totalObtained: total.obtained,
          totalMarks: total.full,
          grade: getGrade(total.obtained, total.full),
        };
      }),
    };

    console.log("RESULT DATA 👉", payload);
    Alert.alert("Success", "Result saved successfully");
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- STUDENT INFO ---------- */}
        <View style={styles.infoCard}>
          <Text style={styles.name}>{studentName}</Text>
          <Text style={styles.meta}>
            Roll: {rollNo} | Class {className}-{section}
          </Text>
          <Text style={styles.meta}>
            Session: {session} | {examType}
          </Text>
        </View>

        {/* ---------- SUBJECTS ---------- */}
        {subjects.map((s, index) => {
          const total = getTotal(s);
          return (
            <View key={s.id} style={styles.subjectCard}>
              <Text style={styles.subjectTitle}>
                Subject {index + 1}
              </Text>

              <TextInput
                placeholder="Subject Name"
                style={styles.input}
                value={s.subject}
                onChangeText={(v) =>
                  updateField(s.id, "subject", v)
                }
              />

              <View style={styles.row}>
                <TextInput
                  placeholder="Theory Marks"
                  keyboardType="numeric"
                  style={styles.input}
                  value={s.theoryMarks}
                  onChangeText={(v) =>
                    updateField(s.id, "theoryMarks", v)
                  }
                />
                <TextInput
                  placeholder="Full Theory"
                  keyboardType="numeric"
                  style={styles.input}
                  value={s.theoryFull}
                  onChangeText={(v) =>
                    updateField(s.id, "theoryFull", v)
                  }
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  placeholder="Practical Marks"
                  keyboardType="numeric"
                  style={styles.input}
                  value={s.practicalMarks}
                  onChangeText={(v) =>
                    updateField(s.id, "practicalMarks", v)
                  }
                />
                <TextInput
                  placeholder="Full Practical"
                  keyboardType="numeric"
                  style={styles.input}
                  value={s.practicalFull}
                  onChangeText={(v) =>
                    updateField(s.id, "practicalFull", v)
                  }
                />
              </View>

              <View style={styles.totalRow}>
                <Text>
                  Total: {total.obtained} / {total.full}
                </Text>
                <Text style={styles.grade}>
                  Grade: {getGrade(total.obtained, total.full)}
                </Text>
              </View>

              {subjects.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeSubject(s.id)}
                >
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.addBtn} onPress={addSubject}>
          <Text style={{ color: "#fff" }}>+ Add More</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={saveResult}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  name: { fontSize: 16, fontWeight: "700" },

  meta: { fontSize: 12, color: "#555" },

  subjectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  subjectTitle: {
    fontWeight: "700",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    gap: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  grade: {
    fontWeight: "700",
  },

  remove: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: "#1c215e",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginBottom: 30,
  },

  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});

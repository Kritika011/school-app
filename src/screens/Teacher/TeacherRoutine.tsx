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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


/* ---------- TYPES ---------- */
type RootStackParamList = {
  Routine: undefined;
  RoutineTab: { screen: string };
};

type Period = {
  id: number;
  startTime?: Date;
  endTime?: Date;
  subject: string;
};

type DayRoutine = {
  id: number;
  day: string;
  periods: Period[];
};

type PickerState = {
  dayId: number;
  periodId: number;
  type: "start" | "end";
} | null;

type InputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
};

/* ---------- CONSTANTS ---------- */
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* ---------- SCREEN ---------- */
export default function TeacherRoutineCreateScreen() {
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigation = useNavigation<any>();
  

  const [className, setClassName] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [routines, setRoutines] = useState<DayRoutine[]>([]);
  const [picker, setPicker] = useState<PickerState>(null);

  /* ---------- DAY ---------- */
  const addDay = (day: string) => {
    if (routines.some((d) => d.day === day)) return;

    setRoutines((prev) => [
      ...prev,
      {
        id: Date.now(),
        day,
        periods: [{ id: Date.now() + 1, subject: "" }],
      },
    ]);
  };

  const removeDay = (dayId: number) => {
    if (routines.length === 1) {
      Alert.alert("At least one day is required");
      return;
    }
    setRoutines((prev) => prev.filter((d) => d.id !== dayId));
  };

  /* ---------- PERIOD ---------- */
  const addPeriod = (dayId: number) => {
    setRoutines((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              periods: [...d.periods, { id: Date.now(), subject: "" }],
            }
          : d
      )
    );
  };

  const removePeriod = (dayId: number, periodId: number) => {
    setRoutines((prev) =>
      prev.map((d) =>
        d.id === dayId && d.periods.length > 1
          ? { ...d, periods: d.periods.filter((p) => p.id !== periodId) }
          : d
      )
    );
  };

  const updatePeriod = <K extends keyof Period>(
    dayId: number,
    periodId: number,
    key: K,
    value: Period[K]
  ) => {
    setRoutines((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              periods: d.periods.map((p) =>
                p.id === periodId ? { ...p, [key]: value } : p
              ),
            }
          : d
      )
    );
  };

  /* ---------- SUBMIT ---------- */
  const submitRoutine = () => {
    if (!className || !section) {
      Alert.alert("Error", "Class and Section are required");
      return;
    }

    if (routines.length === 0) {
      Alert.alert("Error", "Add at least one day");
      return;
    }

    const payload = {
      className,
      section,
      routine: routines,
    };

    console.log("FINAL ROUTINE 👉", payload);
    Alert.alert("Success", "Routine saved successfully");
  };

  /* ---------- TIME PICKER ---------- */
  const onTimeChange = (
    _: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (picker && selectedDate) {
      updatePeriod(
        picker.dayId,
        picker.periodId,
        picker.type === "start" ? "startTime" : "endTime",
        selectedDate
      );
    }
    setPicker(null);
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.viewBtn}
       onPress={() => navigation.navigate("RoutineTab", {screen:"TeacherRoutineListScreen"})}
      >
        <Text style={styles.viewBtnText}>View All Routines</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.card}>
          <Input label="Class" value={className} onChange={setClassName} />
          <Input label="Section" value={section} onChange={setSection} />

          <Text style={styles.sectionTitle}>Select Days</Text>
          <View style={styles.dayRow}>
            {DAYS.map((d) => (
              <TouchableOpacity
                key={d}
                style={styles.dayBtn}
                onPress={() => addDay(d)}
              >
                <Text>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {routines.map((day) => (
            <View key={day.id} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{day.day}</Text>
                <TouchableOpacity onPress={() => removeDay(day.id)}>
                  <Text style={styles.removeDay}>Remove Day</Text>
                </TouchableOpacity>
              </View>

              {day.periods.map((p, index) => (
                <View key={p.id} style={styles.periodCard}>
                  <Text style={styles.periodTitle}>
                    Period {index + 1}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      setPicker({ dayId: day.id, periodId: p.id, type: "start" })
                    }
                  >
                    <Text style={styles.timeText}>
                      {p.startTime
                        ? `Start: ${p.startTime.toLocaleTimeString()}`
                        : "➕ Add Start Time"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setPicker({ dayId: day.id, periodId: p.id, type: "end" })
                    }
                  >
                    <Text style={styles.timeText}>
                      {p.endTime
                        ? `End: ${p.endTime.toLocaleTimeString()}`
                        : "➕ Add End Time"}
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    placeholder="Subject"
                    style={styles.input}
                    value={p.subject}
                    onChangeText={(t) =>
                      updatePeriod(day.id, p.id, "subject", t)
                    }
                  />

                  {day.periods.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removePeriod(day.id, p.id)}
                    >
                      <Text style={styles.removePeriod}>Remove Period</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity
                style={styles.addMore}
                onPress={() => addPeriod(day.id)}
              >
                <Text style={{ color: "#fff" }}>+ Add Period</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.submitBtn} onPress={submitRoutine}>
            <Text style={styles.submitText}>Submit Routine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {picker && (
        <DateTimePicker
          mode="time"
          value={
            picker.type === "start"
              ? routines
                  .find((d) => d.id === picker.dayId)
                  ?.periods.find((p) => p.id === picker.periodId)?.startTime ??
                new Date(0, 0, 0, 9, 0)
              : routines
                  .find((d) => d.id === picker.dayId)
                  ?.periods.find((p) => p.id === picker.periodId)?.endTime ??
                new Date(0, 0, 0, 10, 0)
          }
          onChange={onTimeChange}
        />
      )}
    </LinearGradient>
  );
}

/* ---------- INPUT ---------- */
const Input: React.FC<InputProps> = ({ label, value, onChange }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChange} />
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14 },
  label: { fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
  sectionTitle: { marginTop: 14, fontWeight: "700", fontSize: 16 },
  dayRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  dayBtn: { borderWidth: 1, padding: 8, borderRadius: 8 },
  dayCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayTitle: { fontWeight: "700" },
  removeDay: { color: "#e74c3c", fontWeight: "600" },
  periodCard: { marginTop: 8 },
  periodTitle: { fontWeight: "600" },
  timeText: { color: "#3d649a", marginVertical: 2 },
  removePeriod: {
    color: "#e74c3c",
    fontSize: 12,
    alignSelf: "flex-end",
  },
  addMore: {
    backgroundColor: "#3d649a",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 6,
  },
  submitBtn: {
    backgroundColor: "#051e3b",
    padding: 14,
    borderRadius: 10,
    marginTop: 18,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  viewBtn: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 20,
    borderColor:"#fff",
    borderWidth:1,
    marginBottom: 10,
  },
  viewBtnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

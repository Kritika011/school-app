import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";

/* ---------- TYPES ---------- */
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

type RootStackParamList = {
  EditRoutine: { routineId: number };
};

const ROUTINE_META = {
  className: "10",
  section: "A",
  session: "2025 - 26",
};

const EXISTING_ROUTINE: DayRoutine[] = [
  {
    id: 1,
    day: "Monday",
    periods: [
      {
        id: 11,
        startTime: new Date("2026-01-01T09:00"),
        endTime: new Date("2026-01-01T09:45"),
        subject: "Math",
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    periods: [
      {
        id: 21,
        startTime: new Date("2026-01-01T10:00"),
        endTime: new Date("2026-01-01T10:45"),
        subject: "Science",
      },
    ],
  },
];

/* ---------- SCREEN ---------- */
export default function TeacherRoutineEditScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "EditRoutine">>();
  const navigation = useNavigation();
  const { routineId } = route.params;

  const [routines, setRoutines] = useState<DayRoutine[]>(EXISTING_ROUTINE);
  const [picker, setPicker] = useState<{
    dayId: number;
    periodId: number;
    type: "start" | "end";
  } | null>(null);

  /* ---------- DAY ---------- */
  const removeDay = (dayId: number) => {
    if (routines.length === 1) {
      Alert.alert("At least one day required");
      return;
    }
    setRoutines(routines.filter((d) => d.id !== dayId));
  };

  /* ---------- PERIOD ---------- */
  const addPeriod = (dayId: number) => {
    setRoutines(
      routines.map((d) =>
        d.id === dayId
          ? {
              ...d,
              periods: [
                ...d.periods,
                { id: Date.now(), subject: "" },
              ],
            }
          : d
      )
    );
  };

  const removePeriod = (dayId: number, periodId: number) => {
    setRoutines(
      routines.map((d) =>
        d.id === dayId && d.periods.length > 1
          ? {
              ...d,
              periods: d.periods.filter((p) => p.id !== periodId),
            }
          : d
      )
    );
  };

  const updatePeriod = (
    dayId: number,
    periodId: number,
    key: keyof Period,
    value: any
  ) => {
    setRoutines(
      routines.map((d) =>
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

  /* ---------- SAVE ---------- */
  const saveRoutine = () => {
    console.log("UPDATED ROUTINE 👉", routines);
    Alert.alert("Success", "Routine updated successfully");
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <Text style={styles.title}>Edit Routine</Text>
      {/* ---------- CLASS INFO ---------- */}
<View style={styles.infoCard}>
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>Class</Text>
    <Text style={styles.infoValue}>{ROUTINE_META.className}</Text>
  </View>

  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>Section</Text>
    <Text style={styles.infoValue}>{ROUTINE_META.section}</Text>
  </View>

  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>Session</Text>
    <Text style={styles.infoValue}>{ROUTINE_META.session}</Text>
  </View>
</View>


      <ScrollView showsVerticalScrollIndicator={false}>
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
                    setPicker({
                      dayId: day.id,
                      periodId: p.id,
                      type: "start",
                    })
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
                    setPicker({
                      dayId: day.id,
                      periodId: p.id,
                      type: "end",
                    })
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
                    <Text style={styles.removePeriod}>
                      Remove Period
                    </Text>
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

        <TouchableOpacity style={styles.submitBtn} onPress={saveRoutine}>
          <Text style={styles.submitText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {picker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={(e, date) => {
            if (date) {
              updatePeriod(
                picker.dayId,
                picker.periodId,
                picker.type === "start" ? "startTime" : "endTime",
                date
              );
            }
            setPicker(null);
          }}
        />
      )}
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dayTitle: { fontWeight: "700", fontSize: 16 },
  removeDay: { color: "#e74c3c", fontWeight: "600" },
  periodCard: { marginTop: 8 },
  periodTitle: { fontWeight: "600" },
  timeText: { color: "#3d649a", marginVertical: 2 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
  },
  removePeriod: {
    color: "#e74c3c",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  addMore: {
    backgroundColor: "#3d649a",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 8,
  },
  submitBtn: {
    backgroundColor: "#051e3b",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 30,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  infoCard: {
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
},

infoItem: {
  alignItems: "center",
},

infoLabel: {
  fontSize: 12,
  color: "#777",
  marginBottom: 2,
},

infoValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#051e3b",
},

});

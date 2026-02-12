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
import { useNavigation, NavigationProp } from "@react-navigation/native";


/* ---------- TYPES ---------- */
type RootStackParamList = {
  RoutineDetails: { routineId: number };
};

type RoutineSummary = {
  id: number;
  className: string;
  section: string;
  Session: string;
  daysCount: number;
  createdAt: string;
};

/* ---------- DUMMY DATA ---------- */
const SAVED_ROUTINES: RoutineSummary[] = [
  {
    id: 1,
    className: "8",
    section: "A",
    Session : "2024-25",
    daysCount: 6,
    createdAt: "12 Jan 2026",
  },
  {
    id: 2,
    className: "9",
    section: "B",
    Session:"2024-25",
    daysCount: 5,
    createdAt: "20 Jan 2026",
  },
  {
    id: 3,
    className: "10",
    section: "C",
    Session:"2024-25",
    daysCount: 6,
    createdAt: "01 Feb 2026",
  },
];

/* ---------- SCREEN ---------- */
export default function TeacherRoutineListScreen() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");

  const filteredRoutines = SAVED_ROUTINES.filter((r) =>
    `${r.className}${r.section}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteRoutine = (id: number) => {
    Alert.alert(
      "Delete Routine",
      "Are you sure you want to delete this routine?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive" },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <Text style={styles.title}>Saved Routines</Text>

      {/* ---------- SEARCH ---------- */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search by Class or Section (ex: 8A, 9B)"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* ---------- ROUTINE LIST ---------- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredRoutines.length === 0 ? (
          <Text style={styles.emptyText}>No routines found</Text>
        ) : (
          filteredRoutines.map((r) => (
            <View key={r.id} style={styles.routineCard}>
              <View style={styles.row}>
                <Text style={styles.classText}>
                  Class {r.className} - {r.section}
                </Text>
                <Text style={styles.date}>{r.createdAt}</Text>
              </View>

              <Text style={styles.days}>
                Session: {r.Session} 
              </Text>
               <Text style={styles.days}>
               {r.daysCount} Days Routine
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() =>
                    navigation.navigate("TeacherRoutineViewScreen", {
                      routineId: r.id,
                    })
                  }
                >
                  <Text style={styles.btnText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                 onPress={() =>
                    navigation.navigate("TeacherRoutineEditScreen"
                        , {
                      routineId: r.id,
                    }
                )
                  }
                >
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 15,
    paddingVertical: 6,
  },
  routineCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  classText: { fontWeight: "700", fontSize: 16 },
  date: { fontSize: 12, color: "#777" },
  days: { marginTop: 4, fontWeight: "500" },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  viewBtn: {
    backgroundColor: "#3d649a",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "600" },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});

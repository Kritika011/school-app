import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

/* ---------- TYPES ---------- */
type Parent = {
  name: string;
  phone: string;
};

type Attendance = {
  pickup: boolean;
  drop: boolean;
};

type Student = {
  id: string;
  name: string;
  stop: string;
  parents: {
    father?: Parent;
    mother?: Parent;
    guardian?: Parent;
  };
  attendance: {
    [date: string]: Attendance;
  };
};

/* ---------- TODAY DATE ---------- */
const today = new Date().toISOString().split("T")[0];

/* ---------- SAMPLE DATA ---------- */
const studentsData: Student[] = [
  {
    id: "1",
    name: "Rahul Das",
    stop: "Rishra Station",
    parents: {
      father: { name: "Amit Das", phone: "9876543210" },
      mother: { name: "Sunita Das", phone: "9123456780" },
    },
    attendance: {
      [today]: { pickup: true, drop: false },
    },
  },
  {
    id: "2",
    name: "Ananya Roy",
    stop: "Serampore Station",
    parents: {
      guardian: { name: "Rakesh Roy", phone: "9988776655" },
    },
    attendance: {},
  },
  {
    id: "3",
    name: "Arjun Paul",
    stop: "Chuchura Station",
    parents: {
      mother: { name: "Mita Paul", phone: "9090909090" },
    },
    attendance: {
      [today]: { pickup: true, drop: true },
    },
  },
];

export default function DriverStudentsScreen() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [search, setSearch] = useState("");

  /* ---------- HELPERS ---------- */
  const call = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const getTodayAttendance = (student: Student): Attendance => {
    return student.attendance[today] || { pickup: false, drop: false };
  };

  const togglePickup = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;

        const todayAttendance = getTodayAttendance(s);

        return {
          ...s,
          attendance: {
            ...s.attendance,
            [today]: {
              ...todayAttendance,
              pickup: !todayAttendance.pickup,
              drop: todayAttendance.pickup ? todayAttendance.drop : false,
            },
          },
        };
      })
    );
  };

  const toggleDrop = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;

        const todayAttendance = getTodayAttendance(s);

        return {
          ...s,
          attendance: {
            ...s.attendance,
            [today]: {
              ...todayAttendance,
              drop: !todayAttendance.drop,
            },
          },
        };
      })
    );
  };

  const renderParent = (label: string, person?: Parent) => {
    if (!person) return null;

    return (
      <View style={styles.parentRow}>
        <Text style={styles.parentText}>
          {label}: {person.name}
        </Text>
        <TouchableOpacity onPress={() => call(person.phone)}>
          <Ionicons name="call-outline" size={18} color="#0b5ed7" />
        </TouchableOpacity>
      </View>
    );
  };

  /* ---------- FILTER & SUMMARY ---------- */
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.stop.toLowerCase().includes(search.toLowerCase())
  );

  const total = students.length;
  const picked = students.filter(
    (s) => getTodayAttendance(s).pickup
  ).length;
  const dropped = students.filter(
    (s) => getTodayAttendance(s).drop
  ).length;

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: { item: Student }) => {
    const todayAttendance = getTodayAttendance(item);

    return (
      <View style={styles.card}>
        <LinearGradient
  colors={["#051e3b", "#0e3e79"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
          style={styles.cardHeader}
        >
          <Text style={styles.studentName}>{item.name}</Text>
        </LinearGradient>

        <Text style={styles.stop}>📍 {item.stop}</Text>

=
        <View style={styles.statusRow}>
          <TouchableOpacity
            style={[
              styles.statusChip,
              todayAttendance.pickup ? styles.done : styles.pending,
            ]}
            onPress={() => togglePickup(item.id)}
          >
            <Text style={styles.statusText}>
              Pickup {todayAttendance.pickup ? "✓" : "Tap"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!todayAttendance.pickup}
            style={[
              styles.statusChip,
              todayAttendance.drop ? styles.done : styles.pending,
              !todayAttendance.pickup && { opacity: 0.5 },
            ]}
            onPress={() => toggleDrop(item.id)}
          >
            <Text style={styles.statusText}>
              Drop {todayAttendance.drop ? "✓" : "Tap"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* PARENTS */}
        <View style={styles.parentsBox}>
          {renderParent("Father", item.parents.father)}
          {renderParent("Mother", item.parents.mother)}
          {renderParent("Guardian", item.parents.guardian)}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      {/* SUMMARY */}
      <View style={styles.summary}>
        <Text>Total: {total}</Text>
        <Text>Picked: {picked}</Text>
        <Text>Dropped: {dropped}</Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search student or stop..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
  summary: {
    backgroundColor: "#ffffffcc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  stop: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  done: {
    backgroundColor: "#28a745",
  },
  pending: {
    backgroundColor: "#dc3545",
  },
  parentsBox: {
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  parentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  parentText: {
    fontSize: 13,
    color: "#333",
  },
});

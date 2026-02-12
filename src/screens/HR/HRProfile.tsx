import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- TYPES ---------- */
type StudentStatus = "Active" | "Inactive" | "Transferred" | "Passout";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  session: string;
  status: StudentStatus;
  parentName: string;
}

/* ---------- MOCK DATABASE ---------- */
const ALL_STUDENTS: Student[] = Array.from({ length: 500 }).map((_, i) => ({
  id: `${i}`,
  name: `Student ${i}`,
  rollNo: `RN${1000 + i}`,
  className: `${(i % 12) + 1}`,
  section: ["A", "B", "C", "D"][i % 4],
  session: ["2023-24", "2024-25", "2025-26"][i % 3],
  status: (["Active", "Inactive", "Transferred", "Passout"] as StudentStatus[])[
    i % 4
  ],
  parentName: "Ramesh Kumar",
}));

/* ---------- API (SIMULATED SERVER FILTERING) ---------- */
const fetchStudentsAPI = async (
  page: number,
  search: string,
  className: string,
  section: string,
  session: string,
  status: string
): Promise<Student[]> => {
  await new Promise((r) => setTimeout(r, 400));

  let data = [...ALL_STUDENTS];

  if (search)
    data = data.filter(
      s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.includes(search)
    );

  if (className) data = data.filter(s => s.className === className);
  if (section) data = data.filter(s => s.section === section);
  if (session) data = data.filter(s => s.session === session);
  if (status) data = data.filter(s => s.status === status);

  const PAGE_SIZE = 25;
  const start = (page - 1) * PAGE_SIZE;
  return data.slice(start, start + PAGE_SIZE);
};

/* ---------- SCREEN ---------- */
export default function HRAllStudentsScreen() {
  const navigation = useNavigation<any>();

  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* Filters */
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [session, setSession] = useState("");
  const [status, setStatus] = useState("");

  const loadStudents = useCallback(
    async (reset = false) => {
      if (loading) return;

      setLoading(true);
      const currentPage = reset ? 1 : page;

      const data = await fetchStudentsAPI(
        currentPage,
        search,
        className,
        section,
        session,
        status
      );

      setStudents(prev => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === 25);
      setPage(currentPage + 1);
      setLoading(false);
    },
    [page, search, className, section, session, status, loading]
  );

  /* RESET DATA WHEN FILTERS CHANGE */
  useEffect(() => {
    loadStudents(true);
  }, [search, className, section, session, status]);

  /* ---------- RENDER ITEM ---------- */
  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.card}>
      <View style={{ flex: 2 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>
          Roll: {item.rollNo} | Parent: {item.parentName}
        </Text>
        <Text style={styles.sub}>
          Class {item.className}-{item.section} | {item.session}
        </Text>
      </View>

      <View style={[styles.badge, badgeColor(item.status)]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>

      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() =>
          navigation.navigate("HRStudents", { studentId: item.id })
        }
      >
        <Text style={{ color: "#fff" }}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
          {/* <Ionicons name="search" size={18} color="#64748b" /> */}
      <TextInput
        placeholder="Search student / roll"
        placeholderTextColor="#ccc"
        style={styles.search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        <Picker style={styles.picker} selectedValue={className} onValueChange={setClassName}>
          <Picker.Item label="Class" value="" />
          {["1","2","3","4","5","6","7","8","9","10","11","12"].map(c =>
            <Picker.Item key={c} label={`Class ${c}`} value={c} />
          )}
        </Picker>

        <Picker style={styles.picker} selectedValue={section} onValueChange={setSection}>
          <Picker.Item label="Section" value="" />
          {["A","B","C","D"].map(s =>
            <Picker.Item key={s} label={s} value={s} />
          )}
        </Picker>
      </View>

      <View style={styles.filterRow}>
        <Picker style={styles.picker} selectedValue={session} onValueChange={setSession}>
          <Picker.Item label="Session" value="" />
          <Picker.Item label="2023-24" value="2023-24" />
          <Picker.Item label="2024-25" value="2024-25" />
          <Picker.Item label="2025-26" value="2025-26" />
        </Picker>

        <Picker style={styles.picker} selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="Status" value="" />
          <Picker.Item label="Active" value="Active" />
          <Picker.Item label="Inactive" value="Inactive" />
          <Picker.Item label="Transferred" value="Transferred" />
          <Picker.Item label="Passout" value="Passout" />
        </Picker>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={() => hasMore && loadStudents()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator color="#fff" /> : null
        }
      />
    </LinearGradient>
  );
}

/* ---------- HELPERS ---------- */
const badgeColor = (status: StudentStatus) => ({
  backgroundColor:
    status === "Active"
      ? "#2ecc71"
      : status === "Inactive"
      ? "#95a5a6"
      : status === "Transferred"
      ? "#3498db"
      : "#e74c3c",
});

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: {
    backgroundColor: "#ffffff22",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  picker: { flex: 1, backgroundColor: "#fff", borderRadius: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontWeight: "700", fontSize: 15 },
  sub: { fontSize: 12, color: "#555" },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  badgeText: { color: "#fff", fontSize: 11 },
  viewBtn: {
    backgroundColor: "#0e3e79",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});

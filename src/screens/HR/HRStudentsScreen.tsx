import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ---------- DUMMY DATA ---------- */
const students = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  class: i % 2 === 0 ? "6-A" : "7-B",
  phone: "9876543210",
  status: i % 2 === 0 ? "Active" : "Pending",
}));

/* ---------- ACTION BUTTON ---------- */
const ActionButton = ({ text, icon, color }: any) => (
  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}>
    <Ionicons name={icon} size={20} color="#1e293b" />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

export default function HRStudentScreen() {
    const navigation = useNavigation<any>();
  /* SEARCH */
  const [search, setSearch] = useState("");

  /* FILTER POPUP */
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("All");
  const [cls, setCls] = useState("All");
  const [sort, setSort] = useState("name_asc");

  /* FILTER + SORT LOGIC */
  const filteredStudents = useMemo(() => {
    let data = [...students];

    // Search
    data = data.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.class.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search)
    );

    // Filter
    if (status !== "All") {
      data = data.filter((s) => s.status === status);
    }
    if (cls !== "All") {
      data = data.filter((s) => s.class === cls);
    }

    // Sorting
    if (sort === "name_asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "newest") {
      data.sort((a, b) => b.id - a.id);
    }

    return data;
  }, [search, status, cls, sort]);

  const renderStudent = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          Class {item.class} • {item.status}
        </Text>
        <Text style={styles.meta}>📞 {item.phone}</Text>
      </View>

      <TouchableOpacity style={styles.viewBtns}>
        <Text style={styles.viewTexts}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      {/* ACTION CARDS */}
      <View style={styles.actionCard}>
        <ActionButton
          text="Add New Applications"
          icon="person-add"
          color="#ccffb3"
        />
        <ActionButton
          text="Pending Applications"
          icon="time"
          color="#ffb3b3"
        />
       < TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#ffff99" }]}
  onPress={() => 
    navigation.navigate("Students", {
      screen: "HRAllStudentScreen",
    })
       }>
//   <Ionicons name="people" size={20} color="#1e293b" />
  <Text style={styles.actionText}>
    All Students
  </Text>
   </TouchableOpacity>
       

      </View>

      {/* SEARCH + FILTER */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#64748b" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search student"
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterOpen(true)}
        >
          <Ionicons name="options" size={18} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* STUDENT LIST */}
      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No students found</Text>
        }
      />

      {/* FILTER POPUP */}
      <Modal visible={filterOpen} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Filter & Sort</Text>

            {/* STATUS */}
            <Text style={styles.section}>Status</Text>
            <View style={styles.row}>
              {["All", "Active", "Pending"].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.chip,
                    status === v && styles.chipActive,
                  ]}
                  onPress={() => setStatus(v)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      status === v && styles.chipTextActive,
                    ]}
                  >
                    {v}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* CLASS */}
            <Text style={styles.section}>Class</Text>
            <View style={styles.row}>
              {["All", "6-A", "7-B"].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[
                    styles.chip,
                    cls === v && styles.chipActive,
                  ]}
                  onPress={() => setCls(v)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      cls === v && styles.chipTextActive,
                    ]}
                  >
                    {v}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SORT */}
            <Text style={styles.section}>Sort By</Text>
            <View style={styles.row}>
              {[
                { id: "name_asc", label: "A–Z" },
                { id: "name_desc", label: "Z–A" },
                { id: "newest", label: "Newest" },
              ].map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.chip,
                    sort === v.id && styles.chipActive,
                  ]}
                  onPress={() => setSort(v.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      sort === v.id && styles.chipTextActive,
                    ]}
                  >
                    {v.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ACTIONS */}
            <View style={styles.popupActions}>
              <TouchableOpacity
                style={styles.reset}
                onPress={() => {
                  setStatus("All");
                  setCls("All");
                  setSort("name_asc");
                }}
              >
                <Text>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.apply}
                onPress={() => setFilterOpen(false)}
              >
                <Text style={{ color: "#fff" }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  actionCard: {
    backgroundColor: "#ffffff42",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 22,
    marginBottom: 12,
  },
  actionText: { marginLeft: 8, fontWeight: "600" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { marginLeft: 8, flex: 1 },
  filterBtn: {
    backgroundColor: "#fff",
    marginLeft: 10,
    padding: 12,
    borderRadius: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1e3a8a",
    marginRight: 10,
  },
  name: { fontWeight: "600" },
  meta: { fontSize: 11, color: "#64748b" },
  viewBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewText: { color: "#fff", fontSize: 12 },
  viewBtns: {
    backgroundColor: "#000",
    // paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  viewTexts: { color: "#fff", fontSize: 12 },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  popupTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  section: { fontSize: 13, fontWeight: "600", marginTop: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  chipText: { fontSize: 12 },
  chipTextActive: { color: "#fff" },

  popupActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  reset: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    width: "48%",
    alignItems: "center",
  },
  apply: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e3a8a",
    width: "48%",
    alignItems: "center",
  },
  empty: { textAlign: "center", marginTop: 40, color: "#e5edff" },
});

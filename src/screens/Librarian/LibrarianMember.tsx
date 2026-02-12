import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- DUMMY DATA ---------- */
const STUDENTS = [
  {
    id: "1",
    libraryNo: "LB1023",
    name: "Rahul Das",
    issued: 2,
    status: "Active",
    session: "2025-2026",
    class: "8",
    section: "B",
  },
  {
    id: "2",
    libraryNo: "LB1024",
    name: "Ananya Roy",
    issued: 0,
    status: "Active",
    session: "2025-2026",
    class: "8",
    section: "B",
  },
];

const TEACHERS = [
  {
    id: "1",
    libraryNo: "TL201",
    name: "Anita Verma",
    issued: 1,
    status: "Active",
  },
  {
    id: "2",
    libraryNo: "TL202",
    name: "Rakesh Singh",
    issued: 0,
    status: "Active",
  },
];

export default function LibrarianBatchMembersScreen({ navigation }: any) {
  const [tab, setTab] = useState<"Student" | "Teacher">("Student");
  const [search, setSearch] = useState("");
  const [session, setSession] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  /* ---------- FILTER STUDENTS ---------- */
  const filteredStudents = STUDENTS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.libraryNo.toLowerCase().includes(search.toLowerCase());

    const matchSession = session ? s.session === session : true;
    const matchClass = className ? s.class === className : true;
    const matchSection = section ? s.section === section : true;

    return matchSearch && matchSession && matchClass && matchSection;
  });

  /* ---------- FILTER TEACHERS ---------- */
  const filteredTeachers = TEACHERS.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.libraryNo.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          Library No: <Text style={styles.bold}>{item.libraryNo}</Text>
        </Text>
        <Text style={styles.meta}>
          Books Issued: <Text style={styles.bold}>{item.issued}</Text>
        </Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: item.status === "Active" ? "green" : "red" },
            ]}
          />
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <ActionBtn
          icon="add-outline"
          label="Add"
          onPress={() => navigation.navigate("Member", {
  screen: "LibrarianStudentMember",})}
        />
        <ActionBtn
          icon="return-up-back-outline"
          label="Return"
         onPress={() => navigation.navigate("Member", {
  screen: "LibrarianBookReturn",})}
        />
        <ActionBtn
          icon="create-outline"
          label="Edit"
          onPress={() => navigation.navigate("Member", {
  screen: "LibrarianMemberEdit",})}
        />
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <View style={{ padding: 16 }}>
        {/* ---------- TOGGLE ---------- */}
        <View style={styles.toggle}>
          {["Student", "Teacher"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.toggleBtn, tab === t && styles.toggleActive]}
              onPress={() => {
                setTab(t as any);
                setSearch("");
              }}
            >
              <Text
                style={[
                  styles.toggleText,
                  tab === t && styles.toggleTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- SEARCH ---------- */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#406ead" />
          <TextInput
            placeholder={`Search ${tab}`}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ---------- STUDENT FILTER INPUTS ---------- */}
        {tab === "Student" && (
          <View style={styles.filterRow}>
            <TextInput
              placeholder="Session"
              style={styles.filterInput}
              value={session}
              onChangeText={setSession}
            />
            <TextInput
              placeholder="Class"
              style={styles.filterInput}
              value={className}
              onChangeText={setClassName}
            />
            <TextInput
              placeholder="Section"
              style={styles.filterInput}
              value={section}
              onChangeText={setSection}
            />
          </View>
        )}
      </View>

      {/* ---------- LIST ---------- */}
      <FlatList
        data={tab === "Student" ? filteredStudents : filteredTeachers}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

/* ---------- ACTION BUTTON ---------- */
const ActionBtn = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Ionicons name={icon} size={16} color="#fff" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    backgroundColor: "#ffffff40",
    borderRadius: 18,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#fff",
    borderRadius: 18,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "700",
  },
  toggleTextActive: {
    color: "#406ead",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
    width: "32%",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    elevation: 4,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  meta: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  bold: {
    fontWeight: "700",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    marginRight: 6,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
  },

  actions: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#406ead",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
});

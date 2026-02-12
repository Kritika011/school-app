import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- TYPES ---------- */

type Student = {
  id: string;
  name: string;
  roll: string;
  present: number;
};

/* ---------- MAIN ---------- */

const TeacherAttendanceList = ({ navigation }: any) => {
  const [session, setSession] = useState("2024-25");
  const [className, setClassName] = useState("Class 7");
  const [section, setSection] = useState("A");
  const [showList, setShowList] = useState(false);

  const students: Student[] = [
    { id: "1", name: "Ram Sen", roll: "01", present: 220 },
    { id: "2", name: "Sam Das", roll: "02", present: 198 },
    { id: "3", name: "Priya Mallick", roll: "03", present: 230 },
  ];

  const onSearch = () => {
    // API call later
    setShowList(true);
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Attendance History</Text>

        {/* 🔍 SEARCH CARD */}
        <View style={styles.searchCard}>
          <SearchRow
            label="Session"
            value={session}
            onPress={() => setSession("2024-25")}
          />

          <SearchRow
            label="Class"
            value={className}
            onPress={() => setClassName("Class 7")}
          />

          <SearchRow
            label="Section"
            value={section}
            onPress={() => setSection("A")}
          />

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={onSearch}
          >
            <Ionicons
              name="search"
              size={18}
              color="#fff"
            />
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* 📋 STUDENT LIST */}
        {showList && (
          <>
            <Text style={styles.resultText}>
              Showing students for {className} - {section} ({session})
            </Text>

            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.name}>
                      {item.roll}. {item.name}
                    </Text>
                  </View>

                  <Text style={styles.present}>
                    {item.present}
                  </Text>

                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() =>
                      navigation.navigate("TeacherAttendanceHistory", {
                        student: item,
                        session,
                        className,
                        section,
                      })
                    }
                  >
                    <Ionicons
                      name="eye-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default TeacherAttendanceList;

/* ---------- SMALL SEARCH ROW ---------- */

const SearchRow = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.searchRow}
    onPress={onPress}
  >
    <Text style={styles.searchLabel}>{label}</Text>
    <View style={styles.searchValue}>
      <Text style={styles.searchValText}>{value}</Text>
      <Ionicons
        name="chevron-down"
        size={18}
        color="#555"
      />
    </View>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  searchRow: {
    marginBottom: 12,
  },

  searchLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },

  searchValue: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  searchValText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#072445",
  },

  searchBtn: {
    flexDirection: "row",
    backgroundColor: "#0e3e79",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  searchText: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultText: {
    color: "#fff",
    marginBottom: 8,
  },

  row: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontWeight: "600",
    color: "#072445",
  },

  present: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2e7d32",
  },

  viewBtn: {
    backgroundColor: "#0e3e79",
    padding: 8,
    borderRadius: 10,
  },
});

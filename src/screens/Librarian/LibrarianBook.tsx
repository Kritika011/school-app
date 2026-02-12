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
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from '@react-navigation/native';
// import type { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from "@react-navigation/native";

// Replace this with your actual navigator param list
type LibrarianStackParamList = {
  Book: { screen: string };
  // add other routes if needed
};

// type NavigationProp = StackNavigationProp<LibrarianStackParamList, 'Book'>;

/* ---------- TYPES ---------- */
type DueBook = {
  id: string;
  title: string;
  isbn: string;
  borrowerName: string;
  borrowerType: "Student" | "Teacher";
  classSection?: string;
  contact: string;
  expectedReturn: string;
  dueDays: number;
};

/* ---------- DUMMY DATA ---------- */
const DUE_BOOKS: DueBook[] = [
  {
    id: "1",
    title: "Physics Vol 1",
    isbn: "PHY101",
    borrowerName: "Rahul Sharma",
    borrowerType: "Student",
    classSection: "10-A",
    contact: "9876543210",
    expectedReturn: "2025-03-01",
    dueDays: 12,
  },
  {
    id: "2",
    title: "English Literature",
    isbn: "ENG301",
    borrowerName: "Anita Verma",
    borrowerType: "Teacher",
    contact: "9123456789",
    expectedReturn: "2024-11-15",
    dueDays: 98,
  },
  {
    id: "3",
    title: "Mathematics Grade 8",
    isbn: "MAT208",
    borrowerName: "Aman Singh",
    borrowerType: "Student",
    classSection: "8-B",
    contact: "9988776655",
    expectedReturn: "2024-07-10",
    dueDays: 300,
  },
  {
    id: "4",
    title: "Bengali Grade 5",
    isbn: "BEN505",
    borrowerName: "Aman Singh",
    borrowerType: "Student",
    classSection: "8-B",
    contact: "9988776655",
    expectedReturn: "2024-07-10",
    dueDays: 30,
  },
  {
    id: "5",
    title: "EVS Literature",
    isbn: "ENG301",
    borrowerName: "Anita Verma",
    borrowerType: "Teacher",
    contact: "9123456789",
    expectedReturn: "2024-11-12",
    dueDays: 908,
  },
];

export default function DueBooksScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "Student" | "Teacher"
  >("all");
  const [sortOrder, setSortOrder] = useState<
    "highToLow" | "lowToHigh"
  >("highToLow");

  /* ---------- FILTER + SORT ---------- */
  const filteredBooks = DUE_BOOKS
    .filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.borrowerName.toLowerCase().includes(search.toLowerCase()) ||
        b.isbn.toLowerCase().includes(search.toLowerCase());

      const matchType =
        typeFilter === "all" ? true : b.borrowerType === typeFilter;

      return matchSearch && matchType;
    })
    .sort((a, b) =>
      sortOrder === "highToLow"
        ? b.dueDays - a.dueDays
        : a.dueDays - b.dueDays
    );

  /* ---------- CARD ---------- */
  const DueBookCard = ({ item }: { item: DueBook }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.meta}>ISBN: {item.isbn}</Text>

        <View style={styles.divider} />

        <Text style={styles.meta}>
          👤 {item.borrowerName} ({item.borrowerType})
        </Text>

        {item.classSection && (
          <Text style={styles.meta}>🏫 Class: {item.classSection}</Text>
        )}

        <Text style={styles.meta}>📞 {item.contact}</Text>
        <Text style={styles.meta}>
          📅 Return Date: {item.expectedReturn}
        </Text>
      </View>

      <View style={styles.dueBadge}>
        <Text style={styles.dueDays}>{item.dueDays}</Text>
        <Text style={styles.dueText}>Days Due</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      {/* ---------- TOP BUTTONS ---------- */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.topBtn} onPress={() => navigation.navigate("Book", {screen:"LibrarianNewBook"})} >
          <Ionicons name="add-circle-outline" size={20} color="#406ead" />
          <Text style={styles.topBtnText}>Add New Book</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topBtn} onPress={() => navigation.navigate("Book", {screen:"LibrarianAllbook"})}>
          <Ionicons name="book-outline" size={20} color="#406ead" />
          <Text style={styles.topBtnText}>All Books</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- SEARCH ---------- */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#666" />
        <TextInput
          placeholder="Search book / borrower / ISBN"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* ---------- FILTER ROW ---------- */}
      <View style={styles.filterRow}>
        {["all", "Student", "Teacher"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.filterBtn,
              typeFilter === t && styles.filterActive,
            ]}
            onPress={() => setTypeFilter(t as any)}
          >
            <Text
              style={[
                styles.filterText,
                typeFilter === t && styles.filterTextActive,
              ]}
            >
              {t.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- SORT ---------- */}
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[
            styles.sortBtn,
            sortOrder === "highToLow" && styles.sortActive,
          ]}
          onPress={() => setSortOrder("highToLow")}
        >
          <Text style={styles.sortText}>⬆ High → Low</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortBtn,
            sortOrder === "lowToHigh" && styles.sortActive,
          ]}
          onPress={() => setSortOrder("lowToHigh")}
        >
          <Text style={styles.sortText}>⬇ Low → High</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- LIST ---------- */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DueBookCard item={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  topBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 16,
    elevation: 4,
  },
  topBtnText: {
    marginLeft: 6,
    color: "#406ead",
    fontWeight: "600",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 0,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  filterActive: {
    backgroundColor: "#fff",
  },
  filterText: {
    color: "#fff",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#072445",
  },

  sortRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  sortBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  sortActive: {
    backgroundColor: "#dce8ff",
  },
  sortText: {
    fontWeight: "600",
    color: "#072445",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    elevation: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  meta: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 6,
  },

  dueBadge: {
    backgroundColor: "#e74c3c",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  dueDays: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  dueText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});

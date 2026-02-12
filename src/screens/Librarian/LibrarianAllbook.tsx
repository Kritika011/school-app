import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- DUMMY DATA ---------- */
const BOOKS = [
  {
    id: "1",
    title: "Mathematics Grade 8",
    author: "R.S. Aggarwal",
    isbn: "ISBN-1001",
    language: "English",
    type: "Textbook",
    copies: 20,
    rack: "R_10",
  },
  {
    id: "2",
    title: "Bengali Literature",
    author: "Rabindranath Tagore",
    isbn: "ISBN-1002",
    language: "Bengali",
    type: "Reference",
    copies: 12,
    rack: "R_12",
  },
];

/* ---------- CHIP ---------- */
const Chip = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function AllBooksScreen({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [type, setType] = useState("All");

  const filteredBooks = BOOKS.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase());

    const matchLang = language === "All" || b.language === language;
    const matchType = type === "All" || b.type === type;

    return matchSearch && matchLang && matchType;
  });

  const renderBook = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.author} • {item.language}
        </Text>
        <Text style={styles.meta}>
          {item.type} | Copies: {item.copies}
        </Text>
        <Text style={styles.rack}>Rack: {item.rack}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
  style={styles.viewBtn}
  onPress={() =>
    navigation.navigate("Book", {
      screen: "LibrarianViewBook",
      params: { book: item },
    })
  }
>
  <Ionicons name="eye-outline" size={18} color="#406ead" />
</TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          // onPress={() => navigation.navigate("EditBook", { book: item })}
          onPress={() =>
    navigation.navigate("Book", {
      screen: "LibrarianEditBook",
      params: { book: item },
    })
  }
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>
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

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#406ead" />
          <TextInput
            placeholder="Search by title, author, ISBN"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* FILTERS */}
        <Text style={styles.filterLabel}>Language</Text>
        <View style={styles.row}>
          {["All", "English", "Bengali", "Hindi"].map((l) => (
            <Chip
              key={l}
              label={l}
              active={language === l}
              onPress={() => setLanguage(l)}
            />
          ))}
        </View>

        <Text style={styles.filterLabel}>Book Type</Text>
        <View style={styles.row}>
          {["All", "Textbook", "Reference", "Magazine", "Digital"].map(
            (t) => (
              <Chip
                key={t}
                label={t}
                active={type === t}
                onPress={() => setType(t)}
              />
            )
          )}
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#dce8ff",
    marginBottom: 14,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  filterLabel: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#fff",
  },
  chipText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#406ead",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    elevation: 4,
  },

  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  meta: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  rack: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#406ead",
  },

  actions: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  viewBtn: {
    borderWidth: 1,
    borderColor: "#406ead",
    borderRadius: 10,
    padding: 6,
    marginBottom: 6,
  },
  editBtn: {
    backgroundColor: "#406ead",
    borderRadius: 10,
    padding: 6,
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LibrarianViewBook({ route, navigation }: any) {
  const { book } = route.params;

  const InfoRow = ({ label, value }: any) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* HEADER */}
        <Text style={styles.title}>Book Details</Text>
        <Text style={styles.subtitle}>
          Complete library book information
        </Text>

        {/* CARD */}
        <View style={styles.card}>
          <InfoRow label="Book Title" value={book.title} />
          <InfoRow label="Author" value={book.author} />
          <InfoRow label="ISBN / Accession No" value={book.isbn} />
          <InfoRow label="Language" value={book.language} />
          <InfoRow label="Book Type" value={book.type} />
          <InfoRow label="Total Copies" value={book.copies} />
          <InfoRow label="Rack Number" value={book.rack} />
        </View>

        {/* ACTION BUTTONS */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("EditBook", { book })
          }
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editText}>Edit Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#dce8ff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    elevation: 6,
  },
  row: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#072445",
    marginTop: 2,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#406ead",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 18,
    elevation: 5,
  },
  editText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});

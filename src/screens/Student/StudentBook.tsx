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

export default function CollectedBooks() {
  const books = [
    {
      title: "Mathematics Part 1",
      author: "R.D Sharma",
      remaining: 2,
      isbn: "978-1234567890",
      language: "English",
      issueDate: "4 Jan 2025",
      returnDate: "31 Jan 2025",
    },
    {
      title: "Science Explorer",
      author: "S. Chand",
      remaining: 21,
      isbn: "978-9876543210",
      language: "English",
      issueDate: "4 Jan 2025",
      returnDate: "31 Jan 2025",
    },
  ];

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Text style={styles.pageTitle}>📚 Collected Books</Text>

        {/* Student Library Info */}
        <View style={styles.studentCard}>
          <Text style={styles.studentName}>ABC XYZ</Text>
          <Text style={styles.info}>Class: 7-B</Text>
          <Text style={styles.info}>Library ID: LIB10234</Text>
          <Text style={styles.info}>Total Books Issued: 2</Text>
        </View>

        {/* Book List */}
        {books.map((book, index) => (
          <View key={index} style={styles.bookCard}>
            
            {/* Title + Remaining */}
            <View style={styles.topRow}>
              <Text style={styles.bookTitle}>{book.title}</Text>

              <View
                style={[
                  styles.remainingBox,
                  {
                    backgroundColor:
                      book.remaining <= 3 ? "#ff5252" : "#4CAF50",
                  },
                ]}
              >
                <Text style={styles.remainingText}>
                  {book.remaining} days
                </Text>
              </View>
            </View>

            <Text style={styles.label}>
              Author: <Text style={styles.value}>{book.author}</Text>
            </Text>

            <Text style={styles.label}>
              ISBN: <Text style={styles.value}>{book.isbn}</Text>
            </Text>

            <Text style={styles.label}>
              Language: <Text style={styles.value}>{book.language}</Text>
            </Text>

            <View style={styles.dateRow}>
              <Text style={styles.dateText}>
                Issue: {book.issueDate}
              </Text>

              <Text style={styles.dateText}>
                Return: {book.returnDate}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },

  studentCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0e3e79",
  },

  info: {
    fontSize: 13,
    color: "#333",
    marginTop: 4,
  },

  bookCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0e3e79",
    flex: 1,
  },

  remainingBox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  remainingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  label: {
    fontSize: 13,
    color: "#444",
    marginTop: 4,
  },

  value: {
    fontWeight: "600",
    color: "#000",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  dateText: {
    fontSize: 12,
    color: "#555",
  },
});

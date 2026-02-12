import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- DUMMY DATA ---------- */
const STUDENT = {
  name: "Ram Sen",
  libraryNo: "LB1025",
  class: "07-B",
  session: "2025-2026",
};

const ISSUED_BOOKS = [
  {
    id: "1",
    title: "ABC BCS",
    author: "John Smith",
    issueDate: "25 Dec",
    returnDate: "1 Jan",
    remaining: "+6 days",
  },
  {
    id: "2",
    title: "ABC BCD",
    barcode: "ABC012_20",
    issueDate: "25 Dec",
    returnDate: "10 Jan",
    remaining: "-3 days",
  },
];

export default function LibrarianBookReturnScreen() {
  const [selectedBook, setSelectedBook] = useState<any>(null);

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- HEADER ---------- */}
        <Text style={styles.header}>Return Book</Text>

        {/* ---------- STUDENT INFO ---------- */}
        <Section title="Student Details">
          <Info label="Name" value={STUDENT.name} />
          <Info label="Library No" value={STUDENT.libraryNo} />
          <Info label="Class" value={STUDENT.class} />
          <Info label="Session" value={STUDENT.session} />
        </Section>

        {/* ---------- ISSUED BOOKS ---------- */}
        <Section title="Issued Books">
          {ISSUED_BOOKS.map((book) => {
            const overdue = book.remaining.includes("-");

            return (
              <TouchableOpacity
                key={book.id}
                style={[
                  styles.bookCard,
                  selectedBook?.id === book.id && styles.selectedCard,
                ]}
                onPress={() => setSelectedBook(book)}
              >
                <Text style={styles.bookTitle}>{book.title}</Text>

                {book.author && (
                  <Text style={styles.meta}>Author: {book.author}</Text>
                )}
                {book.barcode && (
                  <Text style={styles.meta}>Barcode: {book.barcode}</Text>
                )}

                <View style={styles.rowBetween}>
                  <Text style={styles.meta}>Issue: {book.issueDate}</Text>
                  <Text style={styles.meta}>Return: {book.returnDate}</Text>
                </View>

                <Text
                  style={[
                    styles.remaining,
                    { color: overdue ? "red" : "green" },
                  ]}
                >
                  Remaining: {book.remaining}
                </Text>

                {selectedBook?.id === book.id && (
                  <View style={styles.checkRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="green"
                    />
                    <Text style={styles.selectedText}>Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </Section>

        {/* ---------- RETURN ACTION ---------- */}
        <PrimaryButton
          label="RETURN SELECTED BOOK"
          disabled={!selectedBook}
        />
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Info = ({ label, value }: any) => (
  <Text style={styles.info}>
    {label}: <Text style={styles.bold}>{value}</Text>
  </Text>
);

const PrimaryButton = ({ label, disabled }: any) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    disabled={disabled}
  >
    <Ionicons name="return-up-back-outline" size={18} color="#fff" />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "700",
  },

  bookCard: {
    backgroundColor: "#f5f8ff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e1e8ff",
  },
  selectedCard: {
    borderColor: "green",
    backgroundColor: "#eefaf0",
  },
  bookTitle: {
    fontWeight: "700",
    fontSize: 14,
  },
  meta: {
    fontSize: 12,
    color: "#555",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remaining: {
    fontWeight: "700",
    marginTop: 4,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  selectedText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "green",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#406ead",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#9bb0d1",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
});

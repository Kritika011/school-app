import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LibrarianStudentMember() {
  const [books, setBooks] = useState([
    {
      title: "ABC BCS",
      author: "John Smith",
      issueDate: "25 Dec",
      returnDate: "1 Jan",
      remaining: "+6 days",
    },
    {
      title: "ABC BCD",
      barcode: "ABC012_20",
      issueDate: "25 Dec",
      returnDate: "10 Jan",
      remaining: "-3 days",
    },
  ]);

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- HEADER ---------- */}
        <Text style={styles.header}>Student Member</Text>

        {/* ---------- BASIC INFO ---------- */}
        <Section title="Basic Information">
          <Info label="Name" value="Ram Sen" />
          <Info label="Phone" value="9532018447" />
          <Info label="Email" value="admin@gmail.com" />
          <Info label="Class" value="07" />
          <Info label="Section" value="B" />
          <Info label="Session" value="2025-2026" />
          <Info label="Library No" value="LB1025" /> 
          <Status />
        </Section>

        {/* ---------- ADDRESS ---------- */}
<Section title="Address">
  <Info label="Street" value="52 Road Kolkata" />
  <Info label="Post Office" value="Park Street" />
  <Info label="Pincode" value="700016" />
  <Info label="City" value="Kolkata" />
  <Info label="State" value="West Bengal" />
  <Info label="Country" value="India" />
</Section>


        {/* ---------- BOOK HOLDING ---------- */}
        <Section title="Total Book Holding  (2)">
          {books.map((b, i) => (
            <View key={i} style={styles.bookCard}>
              <Text style={styles.bookTitle}>{b.title}</Text>
              {b.author && <Text style={styles.meta}>Author: {b.author}</Text>}
              {b.barcode && (
                <Text style={styles.meta}>Barcode: {b.barcode}</Text>
              )}

              <View style={styles.rowBetween}>
                <Text style={styles.meta}>Issue: {b.issueDate}</Text>
                <Text style={styles.meta}>Return: {b.returnDate}</Text>
              </View>

              <Text
                style={[
                  styles.remaining,
                  { color: b.remaining.includes("-") ? "red" : "green" },
                ]}
              >
                Remaining: {b.remaining}
              </Text>
            </View>
          ))}
        </Section>

        {/* ---------- ADD NEW BOOK ---------- */}
        <Section title="Issue New Book">
          <Input placeholder="Book Title" />
          <Input placeholder="Barcode" />
          <Input placeholder="Return Date" />
          <PrimaryButton label="SUBMIT" />
        </Section>

        {/* ---------- FINAL SUBMIT ---------- */}
        <PrimaryButton label="UPDATE STUDENT" />
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

const Status = () => (
  <View style={styles.statusRow}>
    <View style={styles.activeDot} />
    <Text style={styles.statusText}>Active</Text>
  </View>
);

const Input = (props: any) => (
  <TextInput style={styles.input} placeholderTextColor="#888" {...props} />
);

const PrimaryButton = ({ label }: any) => (
  <TouchableOpacity style={styles.button}>
    <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
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

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "green",
    marginRight: 6,
  },
  statusText: {
    fontWeight: "700",
    color: "green",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },

  bookCard: {
    backgroundColor: "#f5f8ff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
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

  button: {
    backgroundColor: "#406ead",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
});

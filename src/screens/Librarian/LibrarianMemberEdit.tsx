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

/* ---------- DUMMY DATA ---------- */
const STUDENT = {
  name: "Ram Sen",
  phone: "9532018447",
  email: "admin@gmail.com",
  class: "07",
  section: "B",
  session: "2025-2026",
  status: "Active",
  libraryNo: "LB1025",
  address: {
    street: "52 Road Kolkata",
    postOffice: "Park Street",
    pincode: "700016",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
  },
};

export default function EditLibraryNumberScreen() {
  const [libraryNo, setLibraryNo] = useState(STUDENT.libraryNo);

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- HEADER ---------- */}
        <Text style={styles.header}>Edit Library Number</Text>

        {/* ---------- STUDENT DETAILS ---------- */}
        <Section title="Student Details">
          <Info label="Name" value={STUDENT.name} />
          <Info label="Phone" value={STUDENT.phone} />
          <Info label="Email" value={STUDENT.email} />
          <Info label="Class" value={STUDENT.class} />
          <Info label="Section" value={STUDENT.section} />
          <Info label="Session" value={STUDENT.session} />
          <StatusBadge status={STUDENT.status} />
        </Section>

        {/* ---------- EDITABLE FIELD ---------- */}
        <Section title="Library Information">
          <Text style={styles.inputLabel}>Library Number</Text>
          <TextInput
            value={libraryNo}
            onChangeText={setLibraryNo}
            style={styles.input}
            placeholder="Enter Library Number"
            placeholderTextColor="#999"
          />
        </Section>

        {/* ---------- ADDRESS ---------- */}
        <Section title="Address">
          <Info label="Street" value={STUDENT.address.street} />
          <Info label="Post Office" value={STUDENT.address.postOffice} />
          <Info label="Pincode" value={STUDENT.address.pincode} />
          <Info label="City" value={STUDENT.address.city} />
          <Info label="State" value={STUDENT.address.state} />
          <Info label="Country" value={STUDENT.address.country} />
        </Section>

        {/* ---------- SAVE BUTTON ---------- */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="save-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
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

const StatusBadge = ({ status }: any) => (
  <View style={styles.statusRow}>
    <Text style={styles.info}>Status:</Text>
    <View style={styles.statusBadge}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  </View>
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
    marginBottom: 14,
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
    marginTop: 6,
  },
  statusBadge: {
    backgroundColor: "#e7f7ec",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 6,
  },
  statusText: {
    color: "green",
    fontWeight: "700",
    fontSize: 12,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dbe3ff",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f5f8ff",
  },

  button: {
    backgroundColor: "#406ead",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
});

import React from "react";
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

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function Info({ label, value }: InfoProps) {
  return (
    <Text style={styles.info}>
      <Text style={styles.bold}>{label}: </Text>
      {value}
    </Text>
  );
}

function Status() {
  return (
    <View style={styles.statusRow}>
      <View style={styles.activeDot} />
      <Text style={styles.statusText}>Active</Text>
    </View>
  );
}

export default function TeacherMemberDetailsScreen() {
  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Teacher Member</Text>

        <Section title="Basic Information">
          <Info label="Name" value="Ram Sen" />
          <Info label="Gender" value="Male" />
          <Info label="Email" value="teacher@gmail.com" />
          <Info label="Contact" value="9876543210" />
          <Status />
        </Section>

        <Section title="Parents / Guardian">
          <Input placeholder="Father Name" />
          <Input placeholder="Father Contact" />
          <Input placeholder="Mother Name" />
          <Input placeholder="Mother Contact" />
        </Section>

        <Section title="Address">
          <Input placeholder="Street / Road" />
          <Input placeholder="Post Office" />
          <Input placeholder="Pincode" />
          <Input placeholder="City" />
          <Input placeholder="State" />
          <Input placeholder="Country" />
        </Section>

        <Section title="Issue New Book">
          <Input placeholder="Book Title" />
          <Input placeholder="Barcode" />
          <Input placeholder="Return Date" />
          <PrimaryButton label="SUBMIT" />
        </Section>

        <PrimaryButton label="UPDATE TEACHER" />
      </ScrollView>
    </LinearGradient>
  );
}

/* --- same reusable styles & components as student page --- */

type InputProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

function Input({ placeholder, value, onChangeText }: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#888"
    />
  );
}

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="checkmark-circle" size={20} color="#fff" />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

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
import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StudentProfile() {
  /* ---- Example Data (replace with real data from backend/state) ---- */
  const data = {
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    name: "Rahul Sen",
    gender: "Male",
    dob: "2012-05-14",
    age: 13,
    bloodGroup: "O+",
    category: "General",
    religion: "Hindu",
    aadhaar: "1234-5678-9012",

    address: {
      house: "12A",
      street: "MG Road",
      city: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      postOffice: "Garia",
      country: "India",
      pincode: "700084",
    },

    father: {
      name: "Ramesh Sen",
      contact: "9876543210",
      occupation: "Business",
    },

    mother: {
      name: "Sita Sen",
      contact: "9876501234",
      occupation: "Teacher",
    },

    guardian: {
      name: "—",
      contact: "—",
      relation: "—",
    },

    academic: {
      roll: "12",
      class: "7",
      section: "B",
      discipline: "Science",
      session: "2025 - 2026",
    },
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: data.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.subText}>
            Class {data.academic.class} • Sec {data.academic.section}
          </Text>
        </View>

        {/* Personal Details */}
        <Section title="Personal Details">
          <Row label="Gender" value={data.gender} />
          <Row label="DOB" value={data.dob} />
          <Row label="Age" value={data.age.toString()} />
          <Row label="Blood Group" value={data.bloodGroup} />
          <Row label="Category" value={data.category} />
          <Row label="Religion" value={data.religion} />
        </Section>

        {/* Academic */}
        <Section title="Academic Details">
          <Row label="Roll" value={data.academic.roll} />
          <Row label="Class" value={data.academic.class} />
          <Row label="Section" value={data.academic.section} />
          <Row label="Discipline" value={data.academic.discipline} />
          <Row label="Session" value={data.academic.session} />
        </Section>

        {/* Address */}
        <Section title="Address">
          {Object.entries(data.address).map(([key, value]) => (
            <Row
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
            />
          ))}
        </Section>

        {/* Parents */}
        <Section title="Father">
          <Row label="Name" value={data.father.name} />
          <Row label="Contact" value={data.father.contact} />
          <Row label="Occupation" value={data.father.occupation} />
        </Section>

        <Section title="Mother">
          <Row label="Name" value={data.mother.name} />
          <Row label="Contact" value={data.mother.contact} />
          <Row label="Occupation" value={data.mother.occupation} />
        </Section>

        <Section title="Guardian">
          <Row label="Name" value={data.guardian.name} />
          <Row label="Contact" value={data.guardian.contact} />
          <Row label="Relation" value={data.guardian.relation} />
        </Section>

        {/* Identity */}
        <Section title="Identity">
          <Row label="Aadhaar" value={data.aadhaar} />
        </Section>

      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }: any) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },

  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },

  subText: {
    color: "#e0e0e0",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    color: "#fff",
    fontWeight: "600",
    flex: 1,
  },

  value: {
    color: "#fff",
    flex: 1,
    textAlign: "right",
  },
});

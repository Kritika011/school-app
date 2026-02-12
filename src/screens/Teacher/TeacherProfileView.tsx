import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TeacherProfile() {
  /* ---------- DUMMY TEACHER DATA ---------- */
  const data = {
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

    name: "Rakesh Kumar",
    gender: "Male",
    dob: "1988-08-15",
    age: 36,
    bloodGroup: "O+",
    category: "General",

    address: {
      house: "12A",
      street: "MG Road",
      city: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      postOffice: "Park Circus",
      country: "India",
      pincode: "700017",
    },

    emergencyName: "Sunita Kumar",
    emergencyNumber: "9876543210",
    emergencyRelation: "Wife",

    aadhaar: "2345-6789-0123",
    pan: "PQRSK4567L",

    staffCategory: "Teacher",
    employeeId: "TCH-1024",
    employmentType: "Permanent",
    joiningDate: "2016-07-01",
    experience: "9",

    qualification: "M.Sc, B.Ed",
    subject: "Mathematics",
    classesHandled: "Class 8, 9, 10",
    university: "Calcutta University",
    passingYear: 2012,
    percentage: "82%",
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ---------- PROFILE HEADER ---------- */}
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          <Text style={styles.profileName}>{data.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{data.staffCategory}</Text>
          </View>
        </View>

        {/* ---------- PERSONAL DETAILS ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Personal Details</Text>
          {[
            ["Name", data.name],
            ["Gender", data.gender],
            ["Date of Birth", data.dob],
            ["Age", data.age.toString()],
            ["Blood Group", data.bloodGroup],
            ["Category", data.category],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- ADDRESS ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Address</Text>
          {Object.entries(data.address).map(([key, value]) => (
            <View style={styles.row} key={key}>
              <Text style={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- EMERGENCY CONTACT ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Emergency Contact</Text>
          {[
            ["Name", data.emergencyName],
            ["Number", data.emergencyNumber],
            ["Relation", data.emergencyRelation],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- EMPLOYMENT DETAILS ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Employment Details</Text>
          {[
            ["Employee ID", data.employeeId],
            ["Staff Category", data.staffCategory],
            ["Employment Type", data.employmentType],
            ["Joining Date", data.joiningDate],
            ["Experience (Years)", data.experience],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- TEACHING DETAILS ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Teaching Details</Text>
          {[
            ["Subject", data.subject],
            ["Classes Handled", data.classesHandled],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- EDUCATIONAL QUALIFICATIONS ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Educational Qualifications</Text>
          {[
            ["Qualification", data.qualification],
            ["University / Board", data.university],
            ["Passing Year", data.passingYear.toString()],
            ["Percentage / CGPA", data.percentage],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* ---------- IDENTITY ---------- */}
        <View style={styles.card}>
          <Text style={styles.section}>Identity</Text>
          {[
            ["Aadhaar Number", data.aadhaar],
            ["PAN Number", data.pan],
          ].map(([label, value]) => (
            <View style={styles.row} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STYLES (UNCHANGED) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },

  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  badge: {
    backgroundColor: "#ff9800",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 10,
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  value: {
    color: "#fff",
    flex: 1,
    textAlign: "right",
  },
});

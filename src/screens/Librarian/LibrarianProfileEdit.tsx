import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function LibrarianEditProfile() {
  const navigation = useNavigation<any>();

  const [data, setData] = useState({
    name: "Anita Sharma",
    gender: "Female",
    dob: "1990-04-12",
    age: "35",
    bloodGroup: "B+",
    category: "General",

    house: "45B",
    street: "Library Road",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    postOffice: "Park Street",
    country: "India",
    pincode: "700016",

    aadhaar: "123456789012",
    pan: "ABCDE1234F",

    employmentType: "Permanent",
    joiningDate: "2018-06-10",
    experience: "7",
    staffCategory: "Librarian",

    qualification: "M.Lib",
    subject: "Library Science",
    university: "Calcutta University",
    passingYear: "2015",
    percentage: "78",

    emergencyName: "Raj Sharma",
    emergencyNumber: "9876543210",
    emergencyRelation: "Spouse",

    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleSave = () => {
    console.log("UPDATED LIBRARIAN PROFILE:", data);
    Alert.alert("Success", "Profile updated successfully", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const Input = ({ label, value, onChange, secure }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* PERSONAL */}
        <Text style={styles.section}>Personal Details</Text>
        <Input label="Name" value={data.name} onChange={(v:any) => handleChange("name", v)} />
        <Input label="Gender" value={data.gender} onChange={(v:any) => handleChange("gender", v)} />
        <Input label="DOB" value={data.dob} onChange={(v:any) => handleChange("dob", v)} />
        <Input label="Age" value={data.age} onChange={(v:any) => handleChange("age", v)} />
        <Input label="Blood Group" value={data.bloodGroup} onChange={(v:any) => handleChange("bloodGroup", v)} />
        <Input label="Category" value={data.category} onChange={(v:any) => handleChange("category", v)} />

        {/* ADDRESS */}
        <Text style={styles.section}>Address</Text>
        <Input label="House / Flat" value={data.house} onChange={(v:any) => handleChange("house", v)} />
        <Input label="Street" value={data.street} onChange={(v:any) => handleChange("street", v)} />
        <Input label="City" value={data.city} onChange={(v:any) => handleChange("city", v)} />
        <Input label="District" value={data.district} onChange={(v:any) => handleChange("district", v)} />
        <Input label="State" value={data.state} onChange={(v:any) => handleChange("state", v)} />
        <Input label="Post Office" value={data.postOffice} onChange={(v:any) => handleChange("postOffice", v)} />
        <Input label="Country" value={data.country} onChange={(v:any) => handleChange("country", v)} />
        <Input label="Pincode" value={data.pincode} onChange={(v:any) => handleChange("pincode", v)} />

        {/* EMPLOYMENT */}
        <Text style={styles.section}>Employment Details</Text>
        <Input label="Employment Type" value={data.employmentType} onChange={(v:any) => handleChange("employmentType", v)} />
        <Input label="Joining Date" value={data.joiningDate} onChange={(v:any) => handleChange("joiningDate", v)} />
        <Input label="Experience (Years)" value={data.experience} onChange={(v:any) => handleChange("experience", v)} />
        <Input label="Staff Category" value={data.staffCategory} onChange={(v:any) => handleChange("staffCategory", v)} />

        {/* EDUCATION */}
        <Text style={styles.section}>Educational Qualifications</Text>
        <Input label="Qualification" value={data.qualification} onChange={(v:any) => handleChange("qualification", v)} />
        <Input label="Subject" value={data.subject} onChange={(v:any) => handleChange("subject", v)} />
        <Input label="University" value={data.university} onChange={(v:any) => handleChange("university", v)} />
        <Input label="Passing Year" value={data.passingYear} onChange={(v:any) => handleChange("passingYear", v)} />
        <Input label="Percentage / CGPA" value={data.percentage} onChange={(v:any) => handleChange("percentage", v)} />

        {/* EMERGENCY */}
        <Text style={styles.section}>Emergency Contact</Text>
        <Input label="Name" value={data.emergencyName} onChange={(v:any) => handleChange("emergencyName", v)} />
        <Input label="Number" value={data.emergencyNumber} onChange={(v:any) => handleChange("emergencyNumber", v)} />
        <Input label="Relation" value={data.emergencyRelation} onChange={(v:any) => handleChange("emergencyRelation", v)} />

        {/* IDENTITY */}
        <Text style={styles.section}>Identity</Text>
        <Input label="Aadhaar" value={data.aadhaar} onChange={(v:any) => handleChange("aadhaar", v)} />
        <Input label="PAN" value={data.pan} onChange={(v:any) => handleChange("pan", v)} />

        {/* SECURITY */}
        <Text style={styles.section}>Security</Text>
        <Input label="Password" value={data.password} onChange={(v:any) => handleChange("password", v)} secure />

        {/* ACTIONS */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 25, paddingBottom: 40 },

  section: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginVertical: 14,
    paddingBottom: 6,
  },
  inputGroup: { marginBottom: 12 },
  label: { color: "#fff", marginBottom: 4, fontWeight: "600" },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveBtn: {
    backgroundColor: "#00c853",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  cancelText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

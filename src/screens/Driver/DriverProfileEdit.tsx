import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  // Dummy initial data
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [name, setName] = useState("Suresh Kumar");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("1985-06-15");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [house, setHouse] = useState("123");
  const [street, setStreet] = useState("MG Road");
  const [city, setCity] = useState("Bangalore");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560001");
  const [phone, setPhone] = useState("9876543210");

  const handleSave = () => {
    // Dummy save
    Alert.alert("Success", "Profile updated successfully!");
  };

  const renderInput = (
    label: string,
    value: string,
    setValue: (val: string) => void,
    keyboardType: "default" | "numeric" = "default"
  ) => (
    <View style={styles.inputWrapper}>
      <Text style={[styles.floatingLabel, value && { top: -10, fontSize: 12 }]}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder=""
        placeholderTextColor="#aaa"
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Image */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Personal Details */}
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {renderInput("Full Name", name, setName)}
          {renderInput("Gender", gender, setGender)}
          {renderInput("DOB", dob, setDob)}
          {renderInput("Blood Group", bloodGroup, setBloodGroup)}

          {/* Address */}
          <Text style={styles.sectionTitle}>Address</Text>
          {renderInput("House / Flat No.", house, setHouse)}
          {renderInput("Street / Locality", street, setStreet)}
          {renderInput("City", city, setCity)}
          {renderInput("State", state, setState)}
          {renderInput("Pincode", pincode, setPincode, "numeric")}

          {/* Contact */}
          <Text style={styles.sectionTitle}>Contact</Text>
          {renderInput("Phone Number", phone, setPhone, "numeric")}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3d649a",
    padding: 8,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    paddingBottom: 5,
  },
  inputWrapper: { marginBottom: 16, position: "relative" },
  floatingLabel: {
    position: "absolute",
    left: 12,
    top: 14,
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 12,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

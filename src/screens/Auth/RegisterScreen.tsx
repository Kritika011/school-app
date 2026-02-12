import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import FormInput from "../../components/FormInput";
import StudentForm from "./forms/StudentForm";
import HrForm from "./forms/HrForm";
import TeacherForm from "./forms/TeacherForm";
import DriverForm from "./forms/DriverForm";
import LibrarianForm from "./forms/LibrarianForm";
import { useAuth } from "../../context/AuthContext";


type Role = "student" | "teacher" | "hr" | "driver" | "librarian";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<"login" | "register">("register");


  /* ---------- COMMON DATA ---------- */
  const [commonData, setCommonData] = useState({
    name: "",
    phone: "",
    email: "",
    institution: "",
  });

  /* ---------- ROLE ---------- */
  const [role, setRole] = useState<Role>("student");

  /* ---------- ROLE SPECIFIC ---------- */
  const [studentData, setStudentData] = useState<any>({});
  const [teacherData, setTeacherData] = useState<any>({});
  const [hrData, setHrData] = useState<any>({});
  const [driverData, setDriverData] = useState<any>({});
  const [librarianData, setLibrarianData] = useState<any>({});
  


  /* ---------- HANDLERS ---------- */
  const handleCommonChange = (key: any, value: any) => {
    setCommonData({ ...commonData, [key]: value });
  };

  /* ---------- FORM RENDER ---------- */
  const renderFormByRole = () => {
    switch (role) {
      case "student":
        return <StudentForm data={studentData} onChange={setStudentData} />;
      case "teacher":
        return <TeacherForm data={teacherData} onChange={setTeacherData} />;
      case "hr":
        return <HrForm data={hrData} onChange={setHrData} />;
      case "driver":
        return <DriverForm data={driverData} onChange={setDriverData} />;
      case "librarian":
        return (
          <LibrarianForm
            data={librarianData}
            onChange={setLibrarianData}
          />
        );
      default:
        return null;
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleRegister = () => {
    let details = {};

    switch (role) {
      case "student":
        details = studentData;
        break;
      case "teacher":
        details = teacherData;
        break;
      case "hr":
        details = hrData;
        break;
      case "driver":
        details = driverData;
        break;
      case "librarian":
        details = librarianData;
        break;
    }

    const payload = {
      role,
      ...commonData,
      details,
    };

    console.log("REGISTER PAYLOAD:", payload);
    alert("Registration submitted");

    navigation.navigate("Login");
  };

  return (
    <LinearGradient
          colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
          locations={[0, 0.5, 0.7, 1]}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            {/* <Ionicons name="arrow-back" size={24} color="#fff" /> */}
            <Text style={styles.heading}>Don’t have an Account! </Text>
            <Text style={styles.subHeading}>
              Send Your Application now 
            </Text>
            
          </View>
     <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card */}
          <View style={styles.card}>
            {/* Login / Register Toggle */}
            <LinearGradient
      colors={["#204bea", "#0b134c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.toggleContainer}
    >
    
             <TouchableOpacity
      style={[
        styles.toggleButton,
        activeTab === "login" && styles.activeToggle,
      ]}
      onPress={() => {
        setActiveTab("login");
        navigation.navigate("Login");
      }}
    >
      <Text style={styles.toggleText}>Login</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[
        styles.toggleButton,
        activeTab === "register" && styles.activeToggle,
      ]}
      onPress={() => {
        setActiveTab("register");
        navigation.navigate("Register");
      }}
    >
      <Text style={styles.toggleText}>Register</Text>
    </TouchableOpacity>
            </LinearGradient>
     
        <Text style={styles.headings }>
          {role.toUpperCase()} REGISTRATION
        </Text>

        {/* <View style={styles.card}> */}
          {/* COMMON FIELDS */}
          <FormInput
            label="Full Name"
            value={commonData.name}
            onChangeText={(v:any) => handleCommonChange("name", v)}
            placeholder="Enter full name"
          />

          <FormInput
            label="Mobile Number"
            value={commonData.phone}
            onChangeText={(v:any) => handleCommonChange("phone", v)}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
          />

          <FormInput
            label="Email"
            value={commonData.email}
            onChangeText={(v:any) => handleCommonChange("email", v)}
            placeholder="Enter email"
          />

          <FormInput
            label="School / University"
            value={commonData.institution}
            onChangeText={(v:any) =>
              handleCommonChange("institution", v)
            }
            placeholder="Institution name"
          />

          {/* ROLE PICKER */}
          <Text style={styles.label}>Register As</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={role} onValueChange={setRole}>
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Teacher" value="teacher" />
              <Picker.Item label="HR" value="hr" />
              <Picker.Item label="Driver" value="driver" />
              <Picker.Item label="Librarian" value="librarian" />
            </Picker>
          </View>

          {/* DYNAMIC FORM */}
          {renderFormByRole()}

          {/* SUBMIT */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegister}
          >
            <Text style={styles.submitText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
    
          </ScrollView>
    </LinearGradient>

  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    
  },
  header: {
    marginTop: 50,
    marginBottom: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    // marginBottom: 10,
  },
  headings: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    // marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    borderColor: "#0d0404",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  subHeading: {
    color: "#e6f0ffee",
    marginTop: 10,
    fontSize: 14,
  },
  card: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 80,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#0b0f3f",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
    toggleContainer: {
    flexDirection: "row",
    // backgroundColor: "#2e2a5e",
    borderRadius: 30,
    marginBottom: 20,
    overflow: "hidden",
  },
    toggleButton: {
    flex: 1,
    paddingVertical: 13,
    alignItems: "center",
    },
    activeToggle: {
    // backgroundColor: "#4a4df3",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "#fff",
    borderWidth: 2,
    // borderBottomLeftRadius: 30,
    // borderTopLeftRadius: 30,
    borderRadius: 30,
    },
    toggleText: {
    color: "#fff",
    fontWeight: "600",
    },

});

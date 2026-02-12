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

export default function StudentEditProfile() {
  const navigation = useNavigation<any>();

  const [data, setData] = useState({
    name: "Riya Das",
    class: "6",
    section: "B",
    roll: "12",
    fatherName: "Amit Das",
    fatherContact: "9876543210",
    motherName: "Sita Das",
    motherContact: "9123456780",
    house: "45A",
    street: "MG Road",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
  });

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const Input = ({ label, value, onChange }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );

  const handleSave = () => {
    Alert.alert("Success", "Profile Updated Successfully", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.section}>Basic Info</Text>
        <Input label="Name" value={data.name} onChange={(v:any)=>handleChange("name",v)} />
        <Input label="Class" value={data.class} onChange={(v:any)=>handleChange("class",v)} />
        <Input label="Section" value={data.section} onChange={(v:any)=>handleChange("section",v)} />
        <Input label="Roll" value={data.roll} onChange={(v:any)=>handleChange("roll",v)} />

        <Text style={styles.section}>Parents</Text>
        <Input label="Father Name" value={data.fatherName} onChange={(v:any)=>handleChange("fatherName",v)} />
        <Input label="Father Contact" value={data.fatherContact} onChange={(v:any)=>handleChange("fatherContact",v)} />
        <Input label="Mother Name" value={data.motherName} onChange={(v:any)=>handleChange("motherName",v)} />
        <Input label="Mother Contact" value={data.motherContact} onChange={(v:any)=>handleChange("motherContact",v)} />

        <Text style={styles.section}>Address</Text>
        <Input label="House" value={data.house} onChange={(v:any)=>handleChange("house",v)} />
        <Input label="Street" value={data.street} onChange={(v:any)=>handleChange("street",v)} />
        <Input label="City" value={data.city} onChange={(v:any)=>handleChange("city",v)} />
        <Input label="State" value={data.state} onChange={(v:any)=>handleChange("state",v)} />
        <Input label="Pincode" value={data.pincode} onChange={(v:any)=>handleChange("pincode",v)} />

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
  scroll: { padding: 20, paddingBottom: 40 },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 6,
  },

  inputGroup: { marginBottom: 12 },
  label: { color: "#fff", marginBottom: 4 },
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
  saveText: { color: "#fff", fontWeight: "bold" },

  cancelBtn: {
    borderWidth: 1.5,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
});

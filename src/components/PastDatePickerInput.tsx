// PastDatePickerInput.tsx
import React, { useState } from "react";
import { View, Button, Platform, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  value?: string;
  onChange: (date: string) => void;
};

export default function PastDatePickerInput({ label, value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); // keep open on iOS
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      onChange(formatted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setShow(true)}
      >
        <Text style={styles.inputText}>{value || "Select date"}</Text>
        <Ionicons name="calendar-outline" size={24} color="#000" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()} // cannot select future date
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontWeight: "700", marginBottom: 4 , color: "#fff"},
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
     flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: { color: "#000000" },
});

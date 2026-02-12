import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function DOBPickerWithAge({ setAge }: { setAge?: (age: number) => void }) {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 100); // max age = 100

  const handleChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate || new Date());

    if (currentDate && setAge) {
      const today = new Date();
      let age = today.getFullYear() - currentDate.getFullYear();
      const m = today.getMonth() - currentDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < currentDate.getDate())) {
        age--;
      }
      setAge(age);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>Date of Birth</Text>

      <TouchableOpacity style={styles.inputContainer} onPress={() => setShow(true)}>
        <Text style={{ color: date ? "#000" : "#aaa" }}>
          {date ? date.toDateString() : "Select Date of Birth"}
        </Text>
        <Ionicons name="calendar-outline" size={24} color="#000" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          maximumDate={today}
          minimumDate={minDate}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
  },
});

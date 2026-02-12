import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RadioSelectProps = {
  label: string;
  options: string[];
  onSelect?: (value: string) => void;
  value?: string; // ✅ add this
  onChange: (value: string) => void;
};

export default function RadioSelect({ label, options, onSelect, value, onChange }: RadioSelectProps) {
  const [selected, setSelected] = useState<string | null>(value || null);

  const handleSelect = (value: string) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>{label}</Text>
      <View style={styles.container}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => handleSelect(option)}
          >
            <View style={[styles.circle, selected === option && styles.selectedCircle]} />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  optionContainer: { flexDirection: "row", alignItems: "center", marginRight: 16, marginVertical: 4 },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 6,
  },
  selectedCircle: { backgroundColor: "#fff" },
  optionText: { color: "#fff" },
});

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from "react-native";

type DropdownSelectProps = {
  label: string;
  options: string[];
  onSelect?: (value: string) => void;
  value?: string; // ✅ add this
  onChange: (value: string) => void;
};

export default function DropdownSelect({ label, options, onSelect, value, onChange }: DropdownSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setVisible(false);
    if (onSelect) onSelect(value);
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 4 }}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: selected ? "#000" : "#aaa" }}>
          {selected || `Select ${label}`}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
  data={options}
  keyExtractor={(item) => item}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  )}
/>

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    padding: 12,
    backgroundColor: "#fff", // input field remains white
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // darker transparent background
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#1E1E1E", // popup dark background
    borderRadius: 12,
    maxHeight: "50%",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // for Android shadow
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333", // darker separator
  },
  optionText: {
    color: "#fff", // white text
    fontSize: 16,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/* ---------- CHIP SELECTOR ---------- */
const ChipGroup = ({
  label,
  options,
  value,
  onChange,
}: any) => {
  const [custom, setCustom] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addCustomValue = () => {
    if (!custom.trim()) return;
    onChange(custom.trim());
    setCustom("");
    setShowInput(false);
  };

  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.sectionLabel}>{label}</Text>

      <View style={styles.chipRow}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.chip,
              value === opt && styles.chipActive,
            ]}
            onPress={() => onChange(opt)}
          >
            <Text
              style={[
                styles.chipText,
                value === opt && styles.chipTextActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Add Custom Chip */}
        <TouchableOpacity
          style={styles.addChip}
          onPress={() => setShowInput(!showInput)}
        >
          <Ionicons name="add" size={16} color="#000000" />
          <Text style={styles.addChipText}>Add</Text>
        </TouchableOpacity>
      </View>

      {showInput && (
        <View style={styles.customInputBox}>
          <TextInput
            placeholder={`Enter ${label}`}
            value={custom}
            onChangeText={setCustom}
            style={styles.customInput}
          />
          <TouchableOpacity
            style={styles.customSave}
            onPress={addCustomValue}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


export default function AddNewBookScreen() {
  const [copies, setCopies] = useState(10);
  const [language, setLanguage] = useState("English");
  const [type, setType] = useState("Textbook");
  const [issuable, setIssuable] = useState("Yes");

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
      >
        {/* ---------- HEADER ---------- */}
        <Text style={styles.pageTitle}>Add New Book</Text>
        <Text style={styles.pageSubtitle}>
          Library inventory registration
        </Text>

        {/* ---------- BASIC DETAILS ---------- */}
        <Section title="Basic Details">
          <Field label="Book Title" icon="book-outline" />
          <Field label="ISBN / Accession No" icon="barcode-outline" />
          <Field label="Author" icon="person-outline" />
        </Section>

        {/* ---------- CLASSIFICATION ---------- */}
        <Section title="Classification">
          <ChipGroup
            label="Language"
            options={["English", "Bengali", "Hindi"]}
            value={language}
            onChange={setLanguage}
          />

          <ChipGroup
            label="Book Type"
            options={["Textbook", "Reference", "Magazine", "Digital"]}
            value={type}
            onChange={setType}
          />

          <Field label="Category" icon="albums-outline" />
        </Section>

        {/* ---------- INVENTORY ---------- */}
        <Section title="Inventory & Storage">
          <Text style={styles.groupLabel}>Total Copies</Text>
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => copies > 1 && setCopies(copies - 1)}
            >
              <Ionicons name="remove" size={18} color="#000000" />
            </TouchableOpacity>

            <Text style={styles.stepValue}>{copies}</Text>

            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setCopies(copies + 1)}
            >
              <Ionicons name="add" size={18} color="#000000" />
            </TouchableOpacity>
          </View>

          <Field label="Rack Number" icon="grid-outline" placeholder="R_10" />

          <ChipGroup
            label="Issuable"
            options={["Yes", "No"]}
            value={issuable}
            onChange={setIssuable}
          />
        </Section>

        {/* ---------- SAVE ---------- */}
        <TouchableOpacity style={styles.saveBtn}>
          <Ionicons name="save-outline" size={22} color="#000000" />
          <Text style={styles.saveText}>Save Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- SECTION ---------- */
const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

/* ---------- FIELD ---------- */
const Field = ({ label, icon, placeholder }: any) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldBox}>
      <Ionicons name={icon} size={18} color="#406ead" />
      <TextInput
        placeholder={placeholder || label}
        placeholderTextColor="#aaa"
        style={styles.fieldInput}
      />
    </View>
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },
  pageSubtitle: {
    color: "#dce8ff",
    marginBottom: 22,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#ffffff8b",
    borderRadius: 22,
    padding: 16,
    // elevation: 6,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 6,
  },
  fieldBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  fieldInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },

  group: {
    marginBottom: 14,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 6,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f2f4f7",
    marginRight: 8,
    marginBottom: 8,
    borderColor: "#121e41",
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#1f16c0",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  chipTextActive: {
    color: "#fff",
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stepBtn: {
    backgroundColor: "#f2f4f7",
    padding: 10,
    borderRadius: 10,
  },
  stepValue: {
    marginHorizontal: 22,
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },

  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9dc6ff",
    paddingVertical: 16,
    borderRadius: 22,
    elevation: 6,
    marginTop: 10,
  },
  saveText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionLabel: {
  fontSize: 14,
  fontWeight: "700",
  color: "#444",
  marginBottom: 8,
},




addChip: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#000000",
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 7,
  marginBottom: 8,
},

addChipText: {
  marginLeft: 4,
  color: "#000000",
  fontWeight: "700",
  fontSize: 13,
},

customInputBox: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  borderWidth: 1,
  borderColor: "#000000",
  borderRadius: 14,
  paddingHorizontal: 10,
},

customInput: {
  flex: 1,
  height: 42,
},

customSave: {
  backgroundColor: "#031b3c",
  padding: 8,
  borderRadius: 10,
},

});

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

/* ---------- OPTION GROUP ---------- */
const OptionGroup = ({ label, options, value, onChange }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.optionRow}>
      {options.map((opt: string) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.optionBtn,
            value === opt && styles.optionActive,
          ]}
          onPress={() => onChange(opt)}
        >
          <Text
            style={[
              styles.optionText,
              value === opt && styles.optionTextActive,
            ]}
          >
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

/* ---------- INPUT ---------- */
const Input = ({ label, icon, value, onChange }: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputBox}>
      <Ionicons name={icon} size={20} color="#406ead" />
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  </View>
);

export default function EditBookScreen({ route, navigation }: any) {
  const { book } = route.params;

  const [title, setTitle] = useState(book.title);
  const [isbn, setIsbn] = useState(book.isbn);
  const [author, setAuthor] = useState(book.author);
  const [language, setLanguage] = useState(book.language);
  const [type, setType] = useState(book.type);
  const [category, setCategory] = useState(book.category || "");
  const [copies, setCopies] = useState(book.copies);
  const [rack, setRack] = useState(book.rack);
  const [issuable, setIssuable] = useState(book.issuable ? "Yes" : "No");

  const handleSubmit = () => {
    const updatedBook = {
      ...book,
      title,
      isbn,
      author,
      language,
      type,
      category,
      copies,
      rack,
      issuable: issuable === "Yes",
    };

    console.log("UPDATED BOOK:", updatedBook);
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#072445", "#406ead", "#6091d1", "#0f488d"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.title}>Edit Book</Text>
        <Text style={styles.subtitle}>
          Update book information
        </Text>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Input
            label="Book Title"
            icon="book-outline"
            value={title}
            onChange={setTitle}
          />

          <Input
            label="ISBN / Accession No"
            icon="barcode-outline"
            value={isbn}
            onChange={setIsbn}
          />

          <Input
            label="Author"
            icon="person-outline"
            value={author}
            onChange={setAuthor}
          />

          <OptionGroup
            label="Language"
            options={["English", "Bengali", "Hindi"]}
            value={language}
            onChange={setLanguage}
          />

          <OptionGroup
            label="Book Type"
            options={["Textbook", "Reference", "Magazine", "Digital"]}
            value={type}
            onChange={setType}
          />

          <Input
            label="Category"
            icon="albums-outline"
            value={category}
            onChange={setCategory}
          />

          {/* COPIES */}
          <Text style={styles.label}>Total Copies</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => copies > 1 && setCopies(copies - 1)}
            >
              <Ionicons name="remove" size={20} color="#406ead" />
            </TouchableOpacity>

            <Text style={styles.stepValue}>{copies}</Text>

            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setCopies(copies + 1)}
            >
              <Ionicons name="add" size={20} color="#406ead" />
            </TouchableOpacity>
          </View>

          <Input
            label="Rack Number"
            icon="grid-outline"
            value={rack}
            onChange={setRack}
          />

          <OptionGroup
            label="Issuable"
            options={["Yes", "No"]}
            value={issuable}
            onChange={setIssuable}
          />
        </View>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveText}>Update Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#dce8ff",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    elevation: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },

  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 8,
  },
  optionActive: {
    backgroundColor: "#406ead",
    borderColor: "#406ead",
  },
  optionText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  optionTextActive: {
    color: "#fff",
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 8,
  },
  stepValue: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "#406ead",
  },

  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#406ead",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 18,
    elevation: 5,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});

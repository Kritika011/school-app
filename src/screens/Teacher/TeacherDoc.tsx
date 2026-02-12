import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function TeacherDocuments() {
  // Dummy teacher documents data
  const documents = [
    {
      name: "Profile Image",
      status: "Uploaded",
      uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Aadhaar Card Image",
      status: "Pending",
      uri: "",
    },
    {
      name: "PAN Card Image",
      status: "Uploaded",
      uri: "",
    },
    {
      name: "Highest Qualification Marksheet",
      status: "Pending",
      uri: "",
    },
    {
      name: "Resume",
      status: "Pending",
      uri: "",
    },
    {
      name: "Caste Certificate Image",
      status: "Pending",
      uri: "",
    },
  ];

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.title}>Teacher Documents</Text> */}

        <View style={styles.grid}>
          {documents.map((doc) => (
            <View style={styles.card} key={doc.name}>
              <View style={styles.thumbnail}>
                {doc.uri ? (
                  <Image
                    source={{ uri: doc.uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="document-text-outline"
                    size={40}
                    color="#fff"
                  />
                )}
              </View>

              <Text style={styles.docName}>{doc.name}</Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      doc.status === "Uploaded" ? "#4caf50" : "#ff9800",
                  },
                ]}
              >
                <Text style={styles.statusText}>{doc.status}</Text>
              </View>

              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadText}>
                  {doc.status === "Uploaded" ? "Change" : "Upload"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  docName: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
    fontSize: 13,
  },

  statusBadge: {
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  uploadButton: {
    backgroundColor: "#3d649a",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

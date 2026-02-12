import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AssignDriver() {
  const [sameLocation, setSameLocation] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSameLocation = (value: boolean) => {
    setSameLocation(value);
    if (value) {
      setDropoff(pickup);
    }
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Info Banner */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#0e3e79" />
          <Text style={styles.infoText}>
            Find your assigned driver before filling the form
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          
          {/* Driver Name */}
          <Text style={styles.label}>Driver</Text>
          <TextInput
            placeholder="Enter driver name"
            placeholderTextColor="#888"
            style={styles.input}
          />

          {/* Vehicle Number */}
          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput
            placeholder="Enter vehicle number"
            placeholderTextColor="#888"
            style={styles.input}
          />

          {/* Owner Name */}
          <Text style={styles.label}>Owner Name</Text>
          <TextInput
            placeholder="Enter owner name"
            placeholderTextColor="#888"
            style={styles.input}
          />

          {/* Pickup Location */}
          <Text style={styles.label}>Pick Up Location</Text>
          <TextInput
            placeholder="Enter pickup location"
            placeholderTextColor="#888"
            style={styles.input}
            value={pickup}
            onChangeText={setPickup}
          />

          {/* Same Location Toggle */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Same as Pick Up Location</Text>
            <Switch
              value={sameLocation}
              onValueChange={handleSameLocation}
              thumbColor={sameLocation ? "#0e3e79" : "#ccc"}
            />
          </View>

          {/* Drop Off Location */}
          <Text style={styles.label}>Drop Off Location</Text>
          <TextInput
            placeholder="Enter drop off location"
            placeholderTextColor="#888"
            style={styles.input}
            value={dropoff}
            onChangeText={setDropoff}
            editable={!sameLocation}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  infoBox: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  infoText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#0e3e79",
    fontWeight: "600",
    flex: 1,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#0e3e79",
  },

  input: {
    backgroundColor: "#f2f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  switchText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },

  button: {
    marginTop: 24,
    backgroundColor: "#0e3e79",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

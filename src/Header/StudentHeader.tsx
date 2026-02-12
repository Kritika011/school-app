import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

interface HRHeaderProps {
  name: string;
  image?: string;
}

export default function HRHeader({
  name,
  image,
}: HRHeaderProps) {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={["#051e3b", "#051e3b"]}
      style={styles.gradient}
    >
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <View style={styles.container}>
          {/* LEFT: IMAGE + NAME */}
          <View style={styles.left}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../assets/icon.png") // add image in assets
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.label}>HR</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>

          {/* RIGHT: ANNOUNCEMENT ICON */}
          <TouchableOpacity
            onPress={() => navigation.navigate("HRProfileTab", { screen: "HRNotice" })}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  gradient: {
    width: "100%",
  },
  safe: {
    backgroundColor: "transparent",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  label: {
    fontSize: 12,
    color: "#dce6f5",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

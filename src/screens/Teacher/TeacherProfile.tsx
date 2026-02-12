import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

/* ---------- DUMMY TEACHER DATA ---------- */
const teacherProfile = {
  image:
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  name: "Anita Sharma",
  subject: "Mathematics",
  department: "Science",
  phone: "+91 98765 43210",
  email: "anita.sharma@school.com",
  employeeId: "TCH-1023",
  experience: 8,
  address: "Kolkata, West Bengal",
};

export default function TeacherProfileScreen() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  const navigation = useNavigation<any>();
  const t = teacherProfile;

  /* ---------- INFO ROW ---------- */
  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | number;
  }) => (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color="#0e3e79" />
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  /* ---------- OPTION ROW ---------- */
  const OptionRow = ({
    icon,
    label,
    danger,
    onPress,
  }: {
    icon: any;
    label: string;
    danger?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.optionLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#dc3545" : "#0e3e79"}
        />
        <Text
          style={[
            styles.optionText,
            danger && { color: "#dc3545" },
          ]}
        >
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.containers}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- PROFILE CARD ---------- */}
        <View style={styles.profileCard}>
          <Image source={{ uri: t.image }} style={styles.avatar} />
          <Text style={styles.name}>{t.name}</Text>
          <Text style={styles.sub}>
            {t.subject} • {t.department}
          </Text>
        </View>

        {/* ---------- DETAILS ---------- */}
        <View style={styles.detailsCard}>
          <InfoRow icon="call-outline" label="Phone" value={t.phone} />
          <InfoRow icon="mail-outline" label="Email" value={t.email} />
          <InfoRow
            icon="card-outline"
            label="Employee ID"
            value={t.employeeId}
          />
          <InfoRow
            icon="briefcase-outline"
            label="Experience"
            value={`${t.experience} years`}
          />
          <InfoRow
            icon="location-outline"
            label="Address"
            value={t.address}
          />
        </View>

        {/* ---------- OPTIONS ---------- */}
        <View style={styles.optionsCard}>
          <OptionRow
            icon="person-outline"
            label="View Profile"
            onPress={() =>
              navigation.navigate("ProfileTab", {
                screen: "TeacherProfileView",
              })
            }
          />
          <OptionRow
            icon="create-outline"
            label="Edit Profile"
            onPress={() =>
              navigation.navigate("ProfileTab", {
                screen: "TeacherProfileEdit",
              })
            }
          />
          <OptionRow
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() =>
              navigation.navigate("ProfileTab", {
                screen: "TeacherChangePassword",
              })
            }
          />
          <OptionRow
            icon="document-text-outline"
            label="Teacher Documents"
            onPress={() =>
              navigation.navigate("ProfileTab", {
                screen: "TeacherDoc",
              })
            }
          />
           <OptionRow
                              icon="log-out-outline"
                              label="Logout"
                              danger
                              onPress={() =>
                                Alert.alert("Logout", "Are you sure you want to logout?", [
                                  { text: "Cancel", style: "cancel" },
                                  {
                                    text: "Logout",
                                    style: "destructive",
                                    onPress: () => handleLogout(),
                                  },
                                ])
                              }
                            />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  containers: { flex: 1 },

  container: { padding: 16 },

  profileCard: {
    alignItems: "center",
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#3734343a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },

  sub: {
    fontSize: 13,
    marginTop: 4,
    color: "#ffffffd7",
  },

  detailsCard: {
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#3734343a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  rowText: {
    marginLeft: 10,
  },

  label: {
    fontSize: 14,
    color: "#ffffffd5",
  },

  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },

  optionsCard: {
    marginTop: 16,
    paddingVertical: 6,
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#3734343a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 12,
    color: "#08053a",
  },
});

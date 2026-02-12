import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

/* ---------- DUMMY LIBRARIAN DATA ---------- */
const librarianProfile = {
  image: "https://i.pravatar.cc/150?img=47",
  name: "Anita Sharma",
  role: "Librarian",
  libraryName: "Central School Library",
  phone: "9876543210",
  email: "librarian@school.edu",
  employeeId: "LIB102",
  qualification: "M.Lib",
  experience: 6,
  shift: "9:00 AM – 4:00 PM",
  totalBooks: 12450,
  sections: "Science, History, Literature",
  issuingLimit: "3 Books",
  finePerDay: "₹5",
  address: "School Campus, Block B",
};

export default function LibrarianProfileScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  const l = librarianProfile;

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
          <Image source={{ uri: l.image }} style={styles.avatar} />
          <Text style={styles.name}>{l.name}</Text>
          <Text style={styles.sub}>
            {l.role} • {l.libraryName}
          </Text>
        </View>

        {/* ---------- DETAILS ---------- */}
        <View style={styles.detailsCard}>
          <InfoRow icon="call-outline" label="Phone" value={l.phone} />
          <InfoRow icon="mail-outline" label="Email" value={l.email} />
          <InfoRow icon="id-card-outline" label="Employee ID" value={l.employeeId} />
          <InfoRow icon="school-outline" label="Qualification" value={l.qualification} />
          <InfoRow
            icon="briefcase-outline"
            label="Experience"
            value={`${l.experience} years`}
          />
          <InfoRow icon="time-outline" label="Shift Timing" value={l.shift} />
          <InfoRow icon="location-outline" label="Address" value={l.address} />
        </View>

        {/* ---------- LIBRARY INFO ---------- */}
        <View style={styles.detailsCard}>
          <InfoRow icon="library-outline" label="Library Name" value={l.libraryName} />
          <InfoRow icon="book-outline" label="Total Books" value={l.totalBooks} />
          <InfoRow icon="albums-outline" label="Sections" value={l.sections} />
          <InfoRow icon="layers-outline" label="Issuing Limit" value={l.issuingLimit} />
          <InfoRow icon="cash-outline" label="Fine Per Day" value={l.finePerDay} />
        </View>

        {/* ---------- OPTIONS ---------- */}
        <View style={styles.optionsCard}>
          <OptionRow
            icon="person-outline"
            label="View Profile"
            onPress={() =>
              navigation.navigate("Profile", { screen: "LibrarianProfileView" })
            }
          />
          <OptionRow
            icon="create-outline"
            label="Edit Profile"
            onPress={() =>
              navigation.navigate("Profile", { screen: "LibrarianProfileEdit" })
            }
          />
          {/* <OptionRow
            icon="book-outline"
            label="Manage Books"
            onPress={() =>
              navigation.navigate("Library", { screen: "ManageBooks" })
            }
          />
          <OptionRow
            icon="people-outline"
            label="Issued Books"
            onPress={() =>
              navigation.navigate("Library", { screen: "IssuedBooks" })
            }
          />
          <OptionRow
            icon="alert-circle-outline"
            label="Overdue Books"
            onPress={() =>
              navigation.navigate("Library", { screen: "OverdueBooks" })
            }
          /> */}
          <OptionRow
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() =>
              navigation.navigate("Profile", { screen: "LibrarianChangePassword" })
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
  

  containers: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  profileCard: {
    alignItems: "center",
    // backgroundColor: "#fff",
    // borderRadius: 14,
    // padding: 20,
    // marginBottom: 16,
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
    // color: "#555",..
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
    color: "#fff",
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
  // backgroundColor: "#fff",
  // borderRadius: 14,
  marginTop: 16,
  paddingVertical: 6,
   elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    // padding: 16,
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
},

});

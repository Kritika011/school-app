import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";



type RootStackParamList = {
  ProfileTab: { screen: string };
};

export default function StudentProfile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useAuth();

const handleLogout = () => {
  logout();
};

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Ionicons name="person-circle-outline" size={80} color="#0e3e79" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>ABC XYZ</Text>
              <Text style={styles.text}>Class: 7 • Sec: B</Text>
              <Text style={styles.text}>Address: xyz, xyz,145230</Text>
              <Text style={styles.text}>Library No: LB0105872</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Parents</Text>
          <Text style={styles.text}>Father: nbcfjg</Text>
          <Text style={styles.text}>Contact: 10235486</Text>
          <Text style={styles.text}>Mother: hjkgjhghm</Text>
          <Text style={styles.text}>Contact: 2354684545</Text>
        </View>

        {/* Bus Driver Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bus Driver Details</Text>
          <Text style={styles.text}>Name: nbfcjg</Text>
          <Text style={styles.text}>Contact: 10235486</Text>
          <Text style={styles.text}>Address: hgfh,bnkj</Text>
          <Text style={styles.text}>
            Bus Number: Unique no / License no
          </Text>
        </View>

        {/* School Info */}
        <View style={styles.card}>
          <Text style={styles.school}>Debiswari Vidyaniketan High School</Text>
          <Text style={styles.text}>12 no road, Kolkata - 742156</Text>
          <Text style={styles.text}>+91 7041052836</Text>
        </View>

        {/* Menu List */}
        {/* <View style={styles.menu}>
          {menuItem("person-outline", "View Profile")}
          {menuItem("lock-closed-outline", "Change Password")}
          {menuItem("create-outline", "Edit Profile")}
          {menuItem("calendar-outline", "Attendance")}
          {menuItem("bus-outline", "Assign Driver")}
          {menuItem("book-outline", "Collected Book")}
          {menuItem("log-out-outline", "Log Out", true)}
        </View> */}
        <View style={styles.optionsCard}>
                  <OptionRow
                    icon="person-outline"
                    label="View Profile"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentProfileView" })
                    }
                  />
                  <OptionRow
                    icon="create-outline"
                    label="Edit Profile"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentProfileEdit" })
                    }
                  />
                  <OptionRow
                    icon="book-outline"
                    label="Collected Book"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentBook" })
                    }
                  />
                  <OptionRow
                    icon="calendar-outline"
                    label="Attendance"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentAttendence" })
                    }
                  />
                  <OptionRow
                    icon="bus-outline"
                    label="Assign Driver"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentDelivery" })
                    }
                  />
                  <OptionRow
                    icon="lock-closed-outline"
                    label="Change Password"
                    onPress={() =>
                      navigation.navigate("ProfileTab", { screen: "StudentChangePassword" })
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

/* ---------- Menu Item ---------- */
const menuItem = (icon: string, label: string, danger = false) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons
      name={icon as any}
      size={22}
      color={danger ? "#ff5252" : "#fff"}
    />
    <Text
      style={[
        styles.menuText,
        danger && { color: "#ff5252", fontWeight: "600" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ---------- Option Row Component ---------- */
interface OptionRowProps {
  icon: string;
  label: string;
  danger?: boolean;
  onPress: () => void;
}

const OptionRow: React.FC<OptionRowProps> = ({ icon, label, danger, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons
      name={icon as any}
      size={22}
      color={danger ? "#ff5252" : "#fff"}
    />
    <Text
      style={[
        styles.menuText,
        danger && { color: "#ff5252", fontWeight: "600" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 8,
  },

  role: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#eaf2fb",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0e3e79",
  },

  text: {
    fontSize: 13,
    color: "#1f2d3d",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#cfd9e6",
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0e3e79",
    marginBottom: 4,
  },

  school: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0e3e79",
    marginBottom: 5,
  },

  menu: {
    marginTop: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },

  menuText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 12,
  },
  optionsCard: {
      // elevation: 3,
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    // padding: 16,
    marginBottom: 15,
    // shadowColor: "#3734343a",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.5,
    // shadowRadius: 6,
  },
});

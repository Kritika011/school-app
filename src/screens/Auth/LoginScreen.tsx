// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";

// export default function LoginScreen() {
//   const { login } = useAuth();
//   const [role, setRole] = useState<any>("student");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (mobile === "1234" && password === "1234") {
//       login(role);
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <LinearGradient
//       // colors={["#0f2027", "#203a43", "#ffffff"]}
//       // colors={["#020024", "#090979", "#ffffff"]}
//       // colors={["#000000", "#1e3c72", "#f5f7fa"]}
//       // colors={["#0b132b", "#ffffff", "#1c2541"]}
//       colors={["#0f2027", "#6acef3", "#0d6991"]}
//       // colors={["#0a0a0a", "#004e92", "#ffffff"]}
//         // colors={["#7fa9d8", "#3f5f8f", "#7fa9d8"]}
//   // start={{ x: 0, y: 0 }}
//   // end={{ x: 1, y: 1 }}
//   // style={{ flex: 1 }}
//   // colors={["#8bb6e8", "#5b7fb2", "#3d5f8a", "#8bb6e8"]}
//   // colors={["#0b132b", "#e79d9d", "#2160b3", "#1c2541"]}
//   // locations={[0, 0.35, 0.65, 1]}
//   // start={{ x: 0, y: 0 }}
//   // end={{ x: 1, y: 1 }}
//   // colors={["#5388df", "#c2e9fb", "#005ef5"]}
//       style={styles.container}
//     >
//       <View style={styles.card}>
//         <Text style={styles.title}>Login</Text>

//         <Text style={styles.label}>
//           Role (student / teacher / hr / driver / librarian)
//         </Text>

//         <TextInput
//           value={role}
//           onChangeText={setRole}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Mobile"
//           placeholderTextColor="#666"
//           keyboardType="numeric"
//           value={mobile}
//           onChangeText={setMobile}
//           style={styles.input}
//         />

//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#666"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//           style={styles.input}
//         /> 

//         <Button title="Login" onPress={handleLogin} />
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#ffffffee",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#203a43",
//   },
//   label: {
//     color: "#203a43",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//   },
// });




import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    if (mobile === "1234" && password === "1234") {
      login(role as any);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* <Ionicons name="arrow-back" size={24} color="#fff" /> */}
        <Text style={styles.heading}>Let’s Sign you in</Text>
        <Text style={styles.subHeading}>
          Welcome Back{"\n"}You Have been missed!
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Login / Register Toggle */}
        <LinearGradient
  colors={["#204bea", "#0b134c"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.toggleContainer}
>

         <TouchableOpacity
  style={[
    styles.toggleButton,
    activeTab === "login" && styles.activeToggle,
  ]}
  onPress={() => {
    setActiveTab("login");
    navigation.navigate("Login");
  }}
>
  <Text style={styles.toggleText}>Login</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.toggleButton,
    activeTab === "register" && styles.activeToggle,
  ]}
  onPress={() => {
    setActiveTab("register");
    navigation.navigate("Register");
  }}
>
  <Text style={styles.toggleText}>Register</Text>
</TouchableOpacity>
        </LinearGradient>

        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter mobile"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
          <Ionicons name="call-outline" size={20} color="#333" />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Ionicons name="eye-outline" size={20} color="#333" />
        </View>

        {/* Role */}
        <Text style={styles.label}>Role</Text>
        <View style={styles.pickerWrapper}>
  <Ionicons
    name="briefcase-outline"
    size={18}
    color="#555"
    style={{ marginLeft: 10 }}
  />
  <Picker
    selectedValue={role}
    onValueChange={setRole}
    style={styles.picker}
    dropdownIconColor="#000000"
  >

          {/* <Picker selectedValue={role} onValueChange={setRole}> */}
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Teacher" value="teacher" />
            <Picker.Item label="HR" value="hr" />
            <Picker.Item label="Driver" value="driver" />
            <Picker.Item label="Librarian" value="librarian" />
          </Picker>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Don’t Have an Account?{" "}
          <Text style={{ color: "#ff4d4d" }}>Sign Up</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
  },
  subHeading: {
    color: "#e6f0ffee",
    marginTop: 10,
    fontSize: 14,
  },
  card: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,

    
  },
  toggleContainer: {
    flexDirection: "row",
    // backgroundColor: "#2e2a5e",
    borderRadius: 30,
    marginBottom: 20,
    overflow: "hidden",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 13,
    alignItems: "center",
  },
  activeToggle: {
    // backgroundColor: "#4a4df3",
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "#fff",
    borderWidth: 2,
    // borderBottomLeftRadius: 30,
    // borderTopLeftRadius: 30,
    borderRadius: 30,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "600",
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
 pickerWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  // paddingVertical:0,
  marginTop: 4,
},
picker: {
  flex: 1,
  // height: 50,
  color: "#333",
},

  loginButton: {
    backgroundColor: "#0b0f3f",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    fontSize: 12,
  },
});

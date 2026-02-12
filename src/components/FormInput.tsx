// import React from "react";
// import { View, Text, TextInput, StyleSheet } from "react-native";

// export default function FormInput({ label, ...props }: any) {
//   return (
//     <View style={styles.wrapper}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       <View style={styles.box}>
//         <TextInput {...props} style={styles.input} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { marginBottom: 10 },
//   label: { color: "#fff", marginBottom: 4 },
//   box: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//   },
//   input: {
//     paddingVertical: 10,
//   },
// });



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export default function FormInput({
  label,
  icon,
  error,
  secureTextEntry,
  editable = true,
  style,
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.box,
          !editable && styles.disabledBox,
          error && styles.errorBox,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color="#666"
            style={styles.leftIcon}
          />
        )}

        <TextInput
          {...props}
          editable={editable}
          secureTextEntry={isPassword && !showPassword}
          style={[styles.input, style]}
          placeholderTextColor="#999"
          
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  disabledBox: {
    backgroundColor: "#f2f2f2",
  },
  errorBox: {
    borderColor: "#ff4d4d",
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
  },
});






// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TextInputProps,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// interface FormInputProps extends TextInputProps {
//   label?: string;
//   icon?: keyof typeof Ionicons.glyphMap;
//   error?: string;
// }

// export default function FormInput({
//   label,
//   icon,
//   error,
//   secureTextEntry,
//   editable = true,
//   value,
//   style,
//   ...props
// }: FormInputProps) {
//   const [focused, setFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const floatAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

//   useEffect(() => {
//     Animated.timing(floatAnim, {
//       toValue: focused || value ? 1 : 0,
//       duration: 180,
//       useNativeDriver: false,
//     }).start();
//   }, [focused, value]);

//   const labelStyle = {
//     position: "absolute" as const,
//     left: icon ? 40 : 14,
//     top: floatAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [14, -8],
//     }),
//     fontSize: floatAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [14, 11],
//     }),
//     color: floatAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ["#999", "#1b3e65"],
//     }),
//     backgroundColor: "#fff",
//     paddingHorizontal: 4,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8 ,
//     zIndex: 10,
//   };

//   return (
//     <View style={styles.wrapper}>
//       <View
//         style={[
//           styles.box,
//           focused && styles.focusedBox,
//           error && styles.errorBox,
//           !editable && styles.disabledBox,
//         ]}
//       >
//         {icon && (
//           <Ionicons
//             name={icon}
//             size={18}
//             color="#666"
//             style={styles.leftIcon}
//           />
//         )}

//         {label && <Animated.Text style={labelStyle}>{label}</Animated.Text>}

//         <TextInput
//           {...props}
//           value={value}
//           editable={editable}
//           secureTextEntry={secureTextEntry && !showPassword}
//           style={[styles.input, style]}
//           placeholder={focused ? props.placeholder : ""}
//           placeholderTextColor="#999"
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//         />

//         {secureTextEntry && (
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Ionicons
//               name={showPassword ? "eye-off-outline" : "eye-outline"}
//               size={18}
//               color="#666"
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   wrapper: {
//     marginBottom: 20,
//   },
//   box: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingTop: 0,
//     borderWidth: 1.5,
//     borderColor: "#ddd",
//     minHeight: 30,
//   },
//   focusedBox: {
//     borderColor: "#1b3e65",
//   },
//   disabledBox: {
//     backgroundColor: "#f2f2f2",
//   },
//   errorBox: {
//     borderColor: "#ff4d4d",
//   },
//   leftIcon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     paddingVertical: 14,
//     color: "#333",
//   },
//   errorText: {
//     color: "#ff4d4d",
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/Auth/LoginScreen";

import StudentTabs from "./StudentTabs";
import TeacherTabs from "./TeacherTabs";
import HrTabs from "./HrTabs";
import DriverTabs from "./DriverTabs";
import LibrarianTabs from "./LibrarianTabs";
import AuthStack from "./AuthStack";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { userRole } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userRole ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : userRole === "student" ? (
        <Stack.Screen name="Student" component={StudentTabs} />
      ) : userRole === "teacher" ? (
        <Stack.Screen name="Teacher" component={TeacherTabs} />
      ) : userRole === "hr" ? (
        <Stack.Screen name="HR" component={HrTabs} />
      ) : userRole === "driver" ? (
        <Stack.Screen name="Driver" component={DriverTabs} />
      ) : (
        <Stack.Screen name="Librarian" component={LibrarianTabs} />
      )}
    </Stack.Navigator>
  );

}

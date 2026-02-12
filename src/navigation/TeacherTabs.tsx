import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";


import TeacherAttendanceHistory from "../screens/Teacher/SingleStudentAttendence";
import TeacherAttendanceList from "../screens/Teacher/TeacherAttendanceList";
import TeacherAttendence from "../screens/Teacher/TeacherAttendanceScreen";
import TeacherDashboard from "../screens/Teacher/TeacherDashboard";
import TeacherProfile from "../screens/Teacher/TeacherProfile";
import TeacherRoutine from "../screens/Teacher/TeacherRoutine";
// import TeacherNotice from "../screens/Teacher/TeacherNotice";
// import TeacherDocuments from "../screens/Teacher/TeacherDocuments";
// import TeacherProfileView from "../screens/Teacher/TeacherProfileView";
// import TeacherProfileEdit from "../screens/Teacher/TeacherProfileEdit";
import TeacherChangePassword from "../screens/Teacher/TeacherChangePassword";
import TeacherHeader from "../Header/TeacherHeader";
import TeacherRoutineViewScreen from "../screens/Teacher/TeacherRoutineViewScreen";
import TeacherRoutineListScreen from "../screens/Teacher/TeacherRoutineListScreen";
import TeacherRoutineEditScreen from "../screens/Teacher/TeacherRoutineEditScreen";
// import TeacherRoutine from "../screens/Teacher/TeacherRoutine";
import TeacherStudentResultList from "../screens/Teacher/TeacherStudentResultList";
import TeacherAddResult from "../screens/Teacher/TeacherAddResult";
import TeacherNotice from "../screens/Teacher/TeacherNotice";
import TeacherDoc from "../screens/Teacher/TeacherDoc";
import TeacherProfileView from "../screens/Teacher/TeacherProfileView";
import TeacherProfileEdit from "../screens/Teacher/TeacherProfileEdit";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------- Dashboard Stack ---------- */
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={TeacherDashboard}
        options={{ title: "Dashboard", headerShown: false }}
      />

      
    </Stack.Navigator>
  );
}

/* ---------- Routine Stack ---------- */
function RoutineStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="TeacherRoutine"
        component={TeacherRoutine}
       options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="TeacherRoutineListScreen"
        component={TeacherRoutineListScreen}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="TeacherRoutineViewScreen"
        component={TeacherRoutineViewScreen}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="TeacherRoutineEditScreen"
        component={TeacherRoutineEditScreen}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function AttendenceStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="TeacherAttendence"
        component={TeacherAttendence}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="TeacherAttendanceHistory"
        component={TeacherAttendanceHistory}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />     
          ),
        }}
      />
      <Stack.Screen
        name="TeacherAttendanceList"
        component={TeacherAttendanceList}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function TeacherResultStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TeacherResults"
        component={TeacherStudentResultList}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="TeacherAddResult"
        component={TeacherAddResult}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
      </Stack.Navigator>

  );
  }

function TeacherProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TeacherProfile"
        component={TeacherProfile}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
          <Stack.Screen
            name="TeacherProfileView"
            component={TeacherProfileView}
            options={{
              header: () => (
                <TeacherHeader name="Suresh Kumar" />
              ),
            }}
          /> 
      <Stack.Screen
        name="TeacherProfileEdit"
        component={TeacherProfileEdit}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      /> 
      <Stack.Screen
        name="TeacherNotice"
        component={TeacherNotice}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      /> 

      <Stack.Screen
        name="TeacherChangePassword"
        component={TeacherChangePassword}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
       <Stack.Screen
        name="TeacherDoc"
        component={TeacherDoc}
        options={{
          header: () => (
            <TeacherHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------- Bottom Tabs ---------- */
export default function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ffcf83",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#0e3e79",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help";

          if (route.name === "DashboardTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AttendenceTab") {
            iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "RoutineTab") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "TeacherResultsTab") {
            iconName = focused ? "school" : "school-outline";
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="AttendenceTab"
        component={AttendenceStack}
        options={{ title: "Attendance" }}
      />
      <Tab.Screen
        name="RoutineTab"
        component={RoutineStack}
        options={{ title: "Routine" }}
      />
      <Tab.Screen
        name="TeacherResultsTab"
        component={TeacherResultStack}
        options={{ title: "Results" }}
      />
   <Tab.Screen
  name="ProfileTab"
  component={TeacherProfileStack}
  listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault();
      navigation.navigate("ProfileTab", {
        screen: "TeacherProfile",
      });
    },
  })}
  options={{ title: "Profile" }}
/>

    </Tab.Navigator>
  );
}

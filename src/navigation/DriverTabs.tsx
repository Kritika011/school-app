import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";


/* ---------- Screens ---------- */
import DriverDashboard from "../screens/Driver/DriverDashboard";
import DriverMapScreen from "../screens/Driver/DriverMapScreen";
import DriverProfile from "../screens/Driver/DriverProfile";
import DriverChangePassword from "../screens/Driver/DriverChangePassword";
import DriverStudent from "../screens/Driver/DriverStudent";
import DriverHeader from "../Header/DriverHeader";
/* ---------- NAVIGATORS ---------- */
import DriverProfileView from "../screens/Driver/DriverProfileView";
import DriverDocuments from "../screens/Driver/DriverDoc";
import DriverProfileEdit from "../screens/Driver/DriverProfileEdit";
import DriverNotice from "../screens/Driver/DriverNotice";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------- Dashboard Stack ---------- */
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriverDashboard"
        component={DriverDashboard}
        options={{ title: "Dashboard", headerShown: false }}
      />

       <Stack.Screen
        name="DriverMapScreen"
        component={DriverMapScreen}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------- Routine Stack ---------- */
function MapStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="DriverMapScreen"
        component={DriverMapScreen}
       options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function DriverStudentStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="DriverStudent"
        component={DriverStudent}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------- Profile Stack ---------- */
function DriverProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriverProfile"
        component={DriverProfile}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="DriverProfileView"
        component={DriverProfileView}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="DriverProfileEdit"
        component={DriverProfileEdit}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="DriverNotice"
        component={DriverNotice}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />

      <Stack.Screen
        name="DriverChangePassword"
        component={DriverChangePassword}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="DriverDocuments"
        component={DriverDocuments}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
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
          } else if (route.name === "MapTab") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "StudentTab") {
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
        name="MapTab"
        component={MapStack}
        options={{ title: "Map" }}
      />
      <Tab.Screen
        name="StudentTab"
        component={DriverStudentStack}
        options={{ title: "Students" }}
      />
      
      {/* <Tab.Screen
  name="ProfileTab"
  component={ProfileStack}
  options={{
    title: "Profile",
    unmountOnBlur: true,
  }}
/> */}
<Tab.Screen
  name="ProfileTab"
  component={DriverProfileStack}
  listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault();
      navigation.navigate("ProfileTab", {
        screen: "DriverProfile",
      });
    },
  })}
  options={{ title: "Profile" }}
/>

    </Tab.Navigator>
  );
}

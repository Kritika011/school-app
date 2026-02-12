import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";


/* ---------- Screens ---------- */
import HRDashboard from "../screens/HR/HRDashboard";
// import HrMapScreen from "../screens/HR/HrMapScreen";
import HrProfile from "../screens/HR/HRProfile";
import HrChangePassword from "../screens/HR/HRChangePassword";
import HRStudentScreen from "../screens/HR/HRStudentsScreen";
import HRHeader from "../Header/HRHeader";
/* ---------- NAVIGATORS ---------- */
import HRAllStudentScreen from "../screens/HR/HRAllStudentsScreen";
// import DriverDocuments from "../screens/Driver/DriverDoc";
// import DriverProfileEdit from "../screens/Driver/DriverProfileEdit";
// import DriverNotice from "../screens/Driver/DriverNotice";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------- Dashboard Stack ---------- */
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HRDashboard"
        component={HRDashboard}
        options={{ 
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
         }}
      />

       {/* <Stack.Screen
        name="HrMapScreen"
        component={HrMapScreen}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}

/* ---------- Routine Stack ---------- */
// function MapStack() {
//   return (
//     <Stack.Navigator>
      
//       <Stack.Screen
//         name="HrMapScreen"
//         component={HrMapScreen}
//        options={{
//           header: () => (
//             <HRHeader name="Suresh Kumar" />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
function HRStudentScreenStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="HRStudentScreen"
        component={HRStudentScreen}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="HRAllStudentScreen"
        component={HRAllStudentScreen}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      />
    </Stack.Navigator>

  );
}

/* ---------- Profile Stack ---------- */
function HRProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HRProfile"
        component={HrProfile}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      />
      {/* <Stack.Screen
        name="DriverProfileView"
        component={HrProfileView}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="DriverProfileEdit"
        component={DriverProfileEdit}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="DriverNotice"
        component={DriverNotice}
        options={{
          header: () => (
            <DriverHeader name="Suresh Kumar" />
          ),
        }}
      /> */}

      <Stack.Screen
        name="HrChangePassword"
        component={HrChangePassword}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      />
      {/* <Stack.Screen
        name="HrDocuments"
        component={HrDocuments}
        options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}

/* ---------- Bottom Tabs ---------- */
export default function HRTabs() {
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

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Students") {
            iconName = focused ? "school" : "school-outline";
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack} 
          />
       
    
      {/* <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{ title: "Map" }}
      />
      <Tab.Screen
        name="StudentTab"
        component={HrStudentStack}
        options={{ title: "Students" }}
      /> */}
      
      {/* <Tab.Screen
  name="ProfileTab"
  component={ProfileStack}
  options={{
    title: "Profile",
    unmountOnBlur: true,
  }}
/> */}
<Tab.Screen
  name="Students"
  component={HRStudentScreenStack}
   listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault();
      navigation.navigate("Students", {
        screen: "HRStudentScreen",
      });
    },
  })}
  options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
/>

<Tab.Screen
  name="Profile"
  component={HRProfileStack}
  listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault();
      navigation.navigate("Profile", {
        screen: "HRProfile",
      });
    },
  })}
  options={{
          header: () => (
            <HRHeader name="Suresh Kumar" />
          ),
        }}
/>

    </Tab.Navigator>
  );
}

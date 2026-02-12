import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import LibrarianDashboard from "../screens/Librarian/LibrarianDashboard";
import LibrarianProfile from "../screens/Librarian/LibrarianProfile";
import LibrarianChangePassword from "../screens/Librarian/LibrarianChangePassword";
import LibrarianHeader from "../Header/LibrarianHeader";
import LibrarianBook from "../screens/Librarian/LibrarianBook";
import LibrarianNewBook from "../screens/Librarian/LibrarianNewBook";
import LibrarianeditBook from "../screens/Librarian/LibrarianEditBook";
import LibrarianViewBook from "../screens/Librarian/LibrarianViewBook";
import LibrarianAllbook from "../screens/Librarian/LibrarianAllbook";
import LibrarianMember from "../screens/Librarian/LibrarianMember";
import LibrarianStudentMember from "../screens/Librarian/LibrarianStudentMember";
import LibrarianTeacherMember from "../screens/Librarian/LibrarianTeacherMember";
import LibrarianMemberEdit from "../screens/Librarian/LibrarianMemberEdit";
import LibrarianBookReturn from "../screens/Librarian/LibrarianBookReturn";
import LibrarianNotice from "../screens/Librarian/LibrarianNotice";
import LibrarianProfileView from "../screens/Librarian/LibrarianProfileView";
import LibrarianProfileEdit from "../screens/Librarian/LibrarianProfileEdit";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------- Librarian Stack ---------- */
function  DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibrarianDashboard"
        component={LibrarianDashboard}
        options={{
                 header: () => (
                   <LibrarianHeader name="Suresh Kumar" />
                 ),
                }}
      />
     
    </Stack.Navigator>
  );
}
function BookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibrarianBooks"
        component={LibrarianBook}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianAllbook"
        component={LibrarianAllbook}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
            />
      <Stack.Screen
        name="LibrarianNewBook"
        component={LibrarianNewBook}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianViewBook"
        component={LibrarianViewBook}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianEditBook"
        component={LibrarianeditBook}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
    </Stack.Navigator>
  );
}
function MemberStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibrarianMember"
        component={LibrarianMember}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianStudentMember"
        component={LibrarianStudentMember}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianTeacherMember"
        component={LibrarianTeacherMember}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianMemberEdit"
        component={LibrarianMemberEdit}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianBookReturn"
        component={LibrarianBookReturn}
        options={{
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />

    </Stack.Navigator>
    
  );
}
      
function ProfileStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="LibrarianProfile"
        component={LibrarianProfile}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianProfileEdit"
        component={LibrarianProfileEdit}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianProfileView"
        component={LibrarianProfileView}
        options={{
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianChangePassword"
        component={LibrarianChangePassword}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" />
          ),
         }}
      />
      <Stack.Screen
        name="LibrarianNotice"
        component={LibrarianNotice}
        options={{ 
          header: () => (
            <LibrarianHeader name="Suresh Kumar" /> 
          ),
         }}
      />  
    </Stack.Navigator>
  );
}

/* ---------- Bottom Tabs ---------- */
export default function LibrarianTabs() {
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
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "StudentTab") {
              iconName = focused ? "school" : "school-outline";
            } else if (route.name === "Book") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Member") {
              iconName = focused ? "people" : "people-outline";
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
    name="Book"
    component={BookStack}
       listeners={({ navigation }) => ({
      tabPress: e => {
        e.preventDefault();
        navigation.navigate("Book", {
          screen: "LibrarianBooks",
        });
      },
    })}
    options={{
            header: () => (
              <LibrarianHeader name="Suresh Kumar" />
            ),
          }}
  />
  <Tab.Screen
    name="Member"
    component={MemberStack}
        listeners={({ navigation }) => ({ 
      tabPress: e => {
        e.preventDefault();
        navigation.navigate("Member", {
          screen: "LibrarianMember",
        });
      },
    })}
    options={{  
            header: () => (   
              <LibrarianHeader name="Suresh Kumar" />
            ),
          }}
  />
    
  <Tab.Screen
    name="Profile"
    component={ProfileStack}
    listeners={({ navigation }) => ({
      tabPress: e => {
        e.preventDefault();
        navigation.navigate("Profile", {
          screen: "LibrarianProfile",
        });
      },
    })}
    options={{
            header: () => (
              <LibrarianHeader name="Suresh Kumar" />
            ),
          }}
  />
  
      </Tab.Navigator>
    );
  }
  
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";


// import StudentAttendanceHistory from "../screens/Student/SingleStudentAttendence";
// import StudentAttendanceList from "../screens/Student/StudentAttendanceList";
// import StudentAttendence from "../screens/Student/StudentAttendanceScreen";
import StudentDashboard from "../screens/Student/StudentDashboard";
// import StudentProfile from "../screens/Student/StudentProfile";
// import StudentRoutine from "../screens/Student/StudentRoutine";
// import StudentNotice from "../screens/Student/StudentNotice";
// import StudentDocuments from "../screens/Student/StudentDocuments";
// import StudentProfileView from "../screens/Student/StudentProfileView";
// import StudentProfileEdit from "../screens/Student/StudentProfileEdit";
import StudentChangePassword from "../screens/Student/StudentChangePassword";
import StudentHeader from "../Header/StudentHeader";
import LocationTracking from "../screens/Student/LocationTracking";
import StudentRoutine from "../screens/Student/StudentRoutine";
import StudentProfile from "../screens/Student/StudentProfile";
// import StudentRoutineViewScreen from "../screens/Student/StudentRoutineViewScreen";
// import StudentRoutineListScreen from "../screens/Student/StudentRoutineListScreen";
// import StudentRoutineEditScreen from "../screens/Student/StudentRoutineEditScreen";
// import StudentRoutine from "../screens/Student/StudentRoutine";
// import StudentStudentResultList from "../screens/Student/StudentStudentResultList";
// import StudentAddResult from "../screens/Student/StudentAddResult";
// import StudentNotice from "../screens/Student/StudentNotice";
// import StudentDoc from "../screens/Student/StudentDoc";
import StudentProfileView from "../screens/Student/StudentProfileView";
import StudentProfileEdit from "../screens/Student/StudentProfileEdit";
import StudentAttendance from "../screens/Student/StudentAttendence";
import StudentBook from "../screens/Student/StudentBook";
import StudentDelivery from "../screens/Student/StudentDelivery";
import StudentResult from "../screens/Student/StudentResult";




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ---------- Dashboard Stack ---------- */
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={StudentDashboard}
        options={{ title: "Dashboard", headerShown: false }}
      />

      
    </Stack.Navigator>
  );
}



function LocationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationTracking"
        component={LocationTracking}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />   
    </Stack.Navigator>
  );
}
function StudentResultStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentResult"
        component={StudentResult}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />   
    </Stack.Navigator>
  );
}
function StudentRoutineStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentRoutine"
        component={StudentRoutine}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
      </Stack.Navigator>

  );
  }

function StudentProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfile}
        // options={{ title: "Profile" ,headerShown: false}}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
          <Stack.Screen
            name="StudentProfileView"
            component={StudentProfileView}
            options={{
              header: () => (
                <StudentHeader name="Suresh Kumar" />
              ),
            }}
          /> 
      <Stack.Screen
        name="StudentProfileEdit"
        component={StudentProfileEdit}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      /> 
      {/* <Stack.Screen
        name="StudentNotice"
        component={StudentNotice}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />  */}

      <Stack.Screen
        name="StudentChangePassword"
        component={StudentChangePassword}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="StudentBook"
        component={StudentBook}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="StudentDelivery"
        component={StudentDelivery}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="StudentResult"
        component={StudentResult}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />
      <Stack.Screen
        name="StudentAttendence"
        component={StudentAttendance}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      />

       {/* <Stack.Screen
        name="StudentDoc"
        component={StudentDoc}
        options={{
          header: () => (
            <StudentHeader name="Suresh Kumar" />
          ),
        }}
      /> */}
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
          } else if (route.name === "StudentResultsTab") {
            iconName = focused ? "school" : "school-outline";
          } else if (route.name === "LocationTab") {
            iconName = focused ? "bus" : "bus-outline";
          } else if (route.name === "StudentResultTab") {
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
      {/* <Tab.Screen
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
        component={StudentResultStack}
        options={{ title: "Results" }}
      /> */}
      <Tab.Screen
        name="LocationTab"
        component={LocationStack}
        options={{
            title: "Bus Location",  
            headerShown: false,
          }}
      />
      <Tab.Screen
        name="RoutineTab"
        component={StudentRoutineStack}
        options={{
            title: "Routine",  
            headerShown: false,
          }}
      />
        <Tab.Screen
        name="StudentResultTab"
        component={StudentResultStack}
        options={{
            title: "Results",  
            headerShown: false,
          }}
      />
   <Tab.Screen
  name="ProfileTab"
  component={StudentProfileStack}
  listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault();
      navigation.navigate("ProfileTab", {
        screen: "StudentProfile",
      });
    },
  })}
  options={{ title: "Profile" }}
/>

    </Tab.Navigator>
  );
}

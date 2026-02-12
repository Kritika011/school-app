import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LOCATION_TASK_NAME } from "../../components/Locations";


const studentsData = [
  { id: "1", name: "Aarav Sharma", stop: "Green Park", picked: false },
  { id: "2", name: "Ananya Verma", stop: "City Mall", picked: false },
  { id: "3", name: "Rohan Singh", stop: "Metro Station", picked: false },
  { id: "4", name: "Isha Mehta", stop: "River Side", picked: false },
  { id: "5", name: "Kabir Patel", stop: "Main Square", picked: false },
  { id: "6", name: "Priya Gupta", stop: "Central Park", picked: false },
  { id: "7", name: "Arjun Reddy", stop: "University Gate", picked: false },
  { id: "8", name: "Sneha Nair", stop: "Shopping Mall", picked: false },
  { id: "9", name: "Vikram Singh", stop: "Bus Station", picked: false },
  { id: "10", name: "Meera Desai", stop: "Hospital Road", picked: false },
];

export default function DriverDashboardScreen() {
  const navigation = useNavigation<any>();

  const [onDuty, setOnDuty] = useState(false);
  const [students, setStudents] = useState(studentsData);
  const [routeEnded, setRouteEnded] = useState(false);
  const [mode, setMode] = useState<"morning" | "evening">("morning");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    (async () => {
      const status = await AsyncStorage.getItem("DRIVER_STATUS");
      if (status === "true") {
        setOnDuty(true);
        startBackgroundLocation();
      } else {
        setOnDuty(false);
      }
    })();
  }, []);


  const startBackgroundLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Location permission is required");
      return;
    }
    const bgStatus = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus.status !== "granted") {
      Alert.alert(
        "Background Permission required",
        "Allow background location tracking"
      );
      return;
    }

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (!hasStarted) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 20,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Live Location Active",
          notificationBody: "Your location is being tracked while on duty",
        },
      });
    }
  };

  const stopBackgroundLocation = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  };

  
  const pickedCount = students.filter((s) => s.picked).length;
  const pendingCount = students.length - pickedCount;

  
  const togglePickup = (id: string) => {
    if (routeEnded) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, picked: !s.picked } : s))
    );
  };

  const allPicked = useMemo(
    () => students.length > 0 && students.every((s) => s.picked),
    [students]
  );

  const sortedStudents = useMemo(
    () => [...students].sort((a, b) => Number(a.picked) - Number(b.picked)),
    [students]
  );

  
  const handleDutyToggle = async (value: boolean) => {
    if (value) {
  
      setOnDuty(true);
      await AsyncStorage.setItem("DRIVER_STATUS", "true");
      startBackgroundLocation();
    } else {
  
      showOffDutyWarning();
    }
  };

  const showOffDutyWarning = () => {
    Alert.alert(
      "Confirm Off Duty",
      `
Total Students: ${students.length}
${mode === "morning" ? "Picked" : "Dropped"}: ${pickedCount}
Pending: ${pendingCount}

Please confirm all ${mode === "morning" ? "pickups" : "drop-offs"} are correct before going off duty.
    `,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Go Off Duty",
          style: "destructive",
          onPress: confirmOffDuty,
        },
      ]
    );
  };
const callSchool = () => { const phoneNumber = "tel:+910000000000"; 
  Linking.openURL(phoneNumber); }; const emergencyCall = () => { Alert.alert(
    "Emergency",
    "Do you want to call emergency support?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Call", style: "destructive", onPress: () => Linking.openURL("tel:112"), },
    ]
  ); };
  const confirmOffDuty = async () => {
    const pickedCount = students.filter((s) => s.picked).length;

    setOnDuty(false);
    setRouteEnded(true);
    await AsyncStorage.setItem("DRIVER_STATUS", "false"); 
    await stopBackgroundLocation(); 

    Alert.alert(
      "Off Duty Successful",
      `${mode === "morning" ? "Picked" : "Dropped"}: ${pickedCount}/${students.length} students`,
      [
        {
          text: "View Map",
          onPress: () => navigation.navigate("MapScreen"),
        },
        { text: "OK", style: "default" },
      ]
    );
  };


  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };


  const renderStudent = ({ item }: any) => {
    const isPicked = item.picked;
    return (
      <View
        style={[styles.studentRow, isPicked && styles.studentRowPicked]}
      >
        <View
          style={[
            styles.statusBar,
            { backgroundColor: isPicked ? "#28a745" : "#0b5ed7" },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.studentName, isPicked && { color: "#2e7d32" }]}>
            {item.name}
          </Text>
          <Text style={styles.studentStop}>
            {mode === "morning" ? "Pickup" : "Drop"} • {item.stop}
          </Text>
        </View>
        <TouchableOpacity
          disabled={routeEnded}
          style={[
            styles.statusChip,
            isPicked ? styles.chipPicked : styles.chipPending,
            routeEnded && { opacity: 0.5 },
          ]}
          onPress={() => togglePickup(item.id)}
        >
          <Ionicons
            name={isPicked ? "checkmark" : "time-outline"}
            size={14}
            color="#fff"
          />
          <Text style={styles.chipText}>
            {isPicked
              ? mode === "morning"
                ? "Picked"
                : "Dropped"
              : "Pending"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
     
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>{getGreeting()}</Text>
          <Text style={styles.driverName}>Ramesh Kumar</Text>
        </View>
        <Ionicons name="bus-outline" size={36} color="#fff" />
      </View>

      <View style={styles.statusCard}>
        <View>
          <Text style={styles.statusLabel}>Driver Status</Text>
          <Text style={styles.statusText}>{onDuty ? "On Duty" : "Off Duty"}
          </Text>
        </View>
        <Switch
          value={onDuty}
          onValueChange={handleDutyToggle}
          trackColor={{ true: "#4caf50", false: "#ea6b6b" }}
        />
      </View>

     <FlatList data={sortedStudents.slice(0, visibleCount)}
      keyExtractor={(item) => item.id}
       renderItem={renderStudent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }} ListHeaderComponent={ 
       <View>
       
       <View style={styles.modeCard}>
         <TouchableOpacity style={[ styles.modeBtn, mode === "morning" && styles.activeMode, ]} onPress={() => { setMode("morning"); setRouteEnded(false); setStudents(studentsData); }} > 
          <Text style={styles.modeText}>🌅 Morning Pickup</Text> 
          </TouchableOpacity> <TouchableOpacity style={[ styles.modeBtn, mode === "evening" && styles.activeMode, ]} onPress={() => { setMode("evening"); setRouteEnded(false); setStudents(studentsData); }} >
             <Text style={styles.modeText}>  🌆 Evening Drop </Text>
              </TouchableOpacity>
              </View> 
            <View style={styles.card}> 
              <Text style={styles.cardTitle}>  🛣{mode === "morning" ? "Pickup Route" : "Drop Route"} </Text>
           <Text style={styles.cardText}>Bus No: MH12 AB 2345</Text> 
           <Text style={styles.cardText}> Green Park → City Mall → Metro Station → School </Text>
            <Text style={styles.cardText}> Time: {mode === "morning" ? "7:30 AM" : "4:00 PM"} 
              </Text> 
              </View>
              {allPicked && (
                 <View style={styles.successBox}>
                   <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
               <Text style={styles.successText}>  All students {mode === "morning" ? "picked" : "dropped"} ✅     </Text>
                </View> )} 
               
                <View style={styles.cards}>
               <Text style={styles.cardsTitle}> 🎒 Student {mode === "morning" ? "Pickup" : "Drop"} List </Text> 
             
                <Text style={styles.cardsText}> 
                  📅 Date: {today}
                   </Text> 
                   </View>
                    </View> }
          ListFooterComponent={
                       <View>
                       {visibleCount < students.length && (
                         <TouchableOpacity style={styles.showMoreBtn} onPress={() => setVisibleCount((prev) => prev + 6)} >
                 <Text style={styles.showMoreText}> Show More Students </Text>
                  </TouchableOpacity> )}
             
          <View style={styles.card}>
             <Text style={styles.cardTitle}>⚡ Quick Actions</Text> 
          <View style={styles.actionsRow}>  
             <ActionButton
    icon="map"
    label="Map"
    onPress={() =>
      navigation.navigate("MapTab", {screen:"DriverMapScreen", params: { time: new Date().toLocaleTimeString() }})
    }
    />
        
          <ActionButton icon="call" label="Call School" onPress={callSchool} /> 
          <ActionButton icon="alert-circle" label="Emergency" danger onPress={emergencyCall} /> 
          </View>
           </View> 
        
           <TouchableOpacity style={[ styles.endRouteButton, routeEnded && { opacity: 0.6 }, ]} onPress={() => setRouteEnded(true)} >
             <Text style={styles.endRouteText}> {routeEnded ? "Route Completed" : "End Route & Lock Pickup"}
               </Text> 
             </TouchableOpacity> 
             </View> 
            } />
    </LinearGradient>
  );
}
function ActionButton({ icon, label, danger, onPress, }: { icon: any; label: string; danger?: boolean; onPress?: () => void; }) { return ( 
<TouchableOpacity onPress={onPress} style={[ styles.actionButton, danger && { backgroundColor: "#ff4d4d" }, ]} > 
  <Ionicons name={icon} size={22} color="#fff" />
   <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity> ); }

const styles = StyleSheet.create({ 
  container: { flex: 1, paddingHorizontal: 15 },
   header: { marginTop: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }, 
   welcome: { color: "#cce7ff", fontSize: 14 },
    driverName: { color: "#fff", fontSize: 22, fontWeight: "bold" }, 
    showMoreBtn: { backgroundColor: "#ffffffee", paddingVertical: 12, borderRadius: 16, alignItems: "center", marginBottom: 15, }, 
    showMoreText: { fontWeight: "600", color: "#0b5ed7", }, 
    statusCard: { backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: 16, padding: 16, marginTop: 15, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
     statusLabel: { color: "#fff70d", fontSize: 15, fontWeight: "600" },
     statusText: {
  color: "#8fff6d",
  fontSize: 20,
  fontWeight: "900", 
},

      modeCard: { flexDirection: "row", marginBottom: 12, },
       modeBtn: { flex: 1, paddingVertical: 10, marginHorizontal: 4, borderRadius: 20, backgroundColor: "rgb(255, 255, 255)", alignItems: "center", }, 
       activeMode: { backgroundColor: "#dbff70ee", },
      modeText: { fontWeight: "600", },
       card: { backgroundColor: "#ffffffee", borderRadius: 16, padding: 15, marginBottom: 15, }, 
       cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 }, 
       cardText: { color: "#333" }, 
       cards: { backgroundColor: "rgba(255, 255, 255, 0.33)", borderRadius: 18, padding: 16, marginBottom: 16, borderLeftWidth: 1.5, borderWidth: 1.5, borderColor: "rgba(255, 255, 255, 0.89)", }, 
       cardsTitle: { fontSize: 16, fontWeight: "700", color: "#1c1c1c", }, 
       cardsText: { color: "#2c2c2c", fontSize: 13, }, 
       successBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#e8f5e9", borderRadius: 12, padding: 10, marginBottom: 12, },
        successText: { marginLeft: 8, fontWeight: "600", color: "#2e7d32", }, 


 studentName: { fontWeight: "600" }, studentStop: { fontSize: 12, color: "#666" }, 
 pickButton: { backgroundColor: "#0b5ed7", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, },
  picked: { backgroundColor: "#28a745" },
   pickText: { color: "#fff", fontSize: 12, fontWeight: "600" }, 
   actionsRow: { flexDirection: "row", justifyContent: "space-between" }, 
  actionButton: { flex: 1, backgroundColor: "#0b5ed7", marginHorizontal: 4, paddingVertical: 12, borderRadius: 14, alignItems: "center", }, 
  actionText: { color: "#fff", fontSize: 12, marginTop: 4 },
   endRouteButton: { backgroundColor: "#1c1c1c", paddingVertical: 16, borderRadius: 18, alignItems: "center", marginBottom: 30, },
    endRouteText:{ color:"#fff", fontWeight:"bold", fontSize :15},
    studentRow:{ flexDirection:"row", alignItems:"center", backgroundColor:"#ffffffee", borderRadius :14,padding :12 ,marginBottom :10},
     studentRowPicked:{ opacity :0.85}, 
    statusBar:{ width :5,height :"100%",borderRadius :10,margin :10}, 
    statusChip:{ flexDirection:"row",alignItems:"center",paddingHorizontal :10,paddingVertical :6,borderRadius :20},
     chipPending:{ backgroundColor:"#0b5ed7"}, chipPicked:{ backgroundColor:"#28a745"}, 
    chipText:{ color:"#fff",fontSize :11,fontWeight :"600" ,marginLeft :4} });
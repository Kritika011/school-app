import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function DriverMapScreen() {
  const [region, setRegion] = useState<any>(null);
  const [startPoint, setStartPoint] = useState<any>(null);

  /* ---------- STOPS ---------- */
  const STOPS = [
    {
      id: "1",
      title: "Rishra Station",
      latitude: 22.7236,
      longitude: 88.3511,
    },
    {
      id: "2",
      title: "Serampore Station",
      latitude: 22.7527,
      longitude: 88.3416,
    },
    {
      id: "3",
      title: "Chuchura Station",
      latitude: 22.9006,
      longitude: 88.392,
    },
  ];

  /* ---------- DESTINATION ---------- */
  const DESTINATION = {
    latitude: 22.8929,
    longitude: 88.3892,
  };

  /* ---------- BUS POSITION ---------- */
  const busPosition = useRef(
    new AnimatedRegion({
      latitude: 22.7236,
      longitude: 88.3511,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  /* ---------- LIVE LOCATION ---------- */
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Location permission is required");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;

          // Set live start point ONCE
          setStartPoint((prev: any) =>
            prev ? prev : { latitude, longitude }
          );

          // Animate bus smoothly
          busPosition.timing({
            toValue: { latitude, longitude },
            duration: 1000,
            useNativeDriver: false,
          }).start();

          // Move map with bus
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    };

    startTracking();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  /* ---------- LOADING ---------- */
  if (!region) {
    return (
      <View style={styles.center}>
        <Text>Getting live location...</Text>
      </View>
    );
  }

  /* ---------- MAP ---------- */
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
      >
        
        {startPoint && (
          <Polyline
            coordinates={[
              startPoint,
              ...STOPS.map((s) => ({
                latitude: s.latitude,
                longitude: s.longitude,
              })),
              DESTINATION,
            ]}
            strokeWidth={4}
            strokeColor="#0b5ed7"
          />
        )}

        {/* START */}
        {startPoint && (
          <Marker coordinate={startPoint} title="You (Live Start)" pinColor="green" />
        )}

        {/* STOPS */}
        {STOPS.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.title}
            pinColor="orange"
          />
        ))}

        {/* DESTINATION */}
        <Marker coordinate={DESTINATION} title="Destination" pinColor="red" />

        {/* LIVE BUS */}
        <Marker.Animated coordinate={busPosition as any}>
          <Ionicons name="bus" size={32} color="#0b5ed7" />
        </Marker.Animated>
      </MapView>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
 
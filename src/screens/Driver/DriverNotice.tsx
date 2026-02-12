import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DriverNotices() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Dummy notices data with read/unread status
  const [notices, setNotices] = useState([
    {
      title: "New Pick-up Route Assigned",
      date: "2026-01-21",
      sender: "Admin",
      description:
        "Driver Suresh Kumar has been assigned a new pick-up route for Route 12 starting from 25th Jan.",
      read: false,
    },
    {
      title: "Student Emergency Drill",
      date: "2026-01-20",
      sender: "Teacher",
      description:
        "All bus drivers must participate in the student emergency drill scheduled on 22nd Jan at 9 AM.",
      read: false,
    },
    {
      title: "Bus Maintenance Update",
      date: "2026-01-18",
      sender: "Admin",
      description:
        "Bus number KA01XY1234 will undergo routine maintenance on 23rd Jan. Please plan accordingly.",
      read: true,
    },
    {
      title: "Holiday Schedule",
      date: "2026-01-15",
      sender: "Teacher",
      description:
        "The school will remain closed on 26th Jan due to Republic Day celebrations.",
      read: true,
    },
  ]);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);

    // Mark as read when expanded
    if (!notices[index].read) {
      const updatedNotices = [...notices];
      updatedNotices[index].read = true;
      setNotices(updatedNotices);
    }
  };

  const senderBadgeColor = (sender: string) => {
    return sender === "Admin" ? "#ff5722" : "#4caf50"; // Admin = orange, Teacher = green
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.title}>Notices</Text> */}

        {notices.map((notice, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => toggleExpand(index)}
              style={[
                styles.card,
                { borderLeftWidth: notice.read ? 0 : 4, borderLeftColor: "#ffeb3b" }, // Yellow bar for unread
              ]}
            >
              <View style={styles.cardHeader}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#ff9800"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.cardTitle}>{notice.title}</Text>
                <Ionicons
                  name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                  size={22}
                  color="#fff"
                />
              </View>

              <View style={styles.cardMeta}>
                <Text style={styles.cardDate}>{notice.date}</Text>
                <View
                  style={[
                    styles.senderBadge,
                    { backgroundColor: senderBadgeColor(notice.sender) },
                  ]}
                >
                  <Text style={styles.senderText}>{notice.sender}</Text>
                </View>
              </View>

              {isExpanded && (
                <Text style={styles.cardDescription}>{notice.description}</Text>
              )}

              {!notice.read && !isExpanded && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>NEW</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.29)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: "relative",
  },  
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 1,
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 8,
    alignItems: "center",
  },
  cardDate: {
    color: "#ffffff",
    fontSize: 12,
  },
  senderBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  senderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  unreadBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#ffeb3b",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  unreadText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
});

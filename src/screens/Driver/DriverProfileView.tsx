import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DriverProfile() {
  // Dummy data
  const data = {
    profileImage:  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    name: "Suresh Kumar",
    gender: "Male",
    dob: "1985-06-15",
    age: 41,
    bloodGroup: "O+",
    address: {
      house: "123",
      street: "MG Road",
      city: "Bangalore",
      district: "Bangalore Urban",
      state: "Karnataka",
      postOffice: "MG Road PO",
      country: "India",
      pincode: "560001",
    },
    emergencyName: "Jane Doe",
    emergencyNumber: "9876543210",
    emergencyRelation: "Spouse",
    licenceNumber: "KA01AB1234",
    licenceType: "LMV",
    issuingRTO: "Bangalore RTO",
    licenceIssueDate: "2010-05-20",
    licenceExpiryDate: "2030-05-19",
    assignedVehicle: "Ambulance 12",
    vehicleNumber: "KA01XY1234",
    joiningDate: "2015-01-10",
    employmentType: "Permanent",
    staffCategory: "Driver",
    aadhaar: "1234-5678-9012",
    pan: "ABCDE1234F",
  };

  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image */}

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: data.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{data.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{data.staffCategory}</Text>
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.card} >
        <Text style={styles.section}>Personal Details</Text>
        {[
          ["Name", data.name],
          ["Gender", data.gender],
          ["DOB", data.dob],
          ["Age", data.age.toString()],
          ["Blood Group", data.bloodGroup],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>
        <View style={styles.card} >
        <Text style={styles.section}>Address</Text>
        {Object.entries(data.address).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>
        <View style={styles.card} >

        {/* Emergency Contact */}
        <Text style={styles.section}>Emergency Contact</Text>
        {[
          ["Name", data.emergencyName],
          ["Number", data.emergencyNumber],
          ["Relation", data.emergencyRelation],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>

        {/* Driving Details */}
        <View style={styles.card} >
        <Text style={styles.section}>Driving Details</Text>
        {[
          ["Licence Number", data.licenceNumber],
          ["Licence Type", data.licenceType],
          ["Issuing RTO", data.issuingRTO],
          ["Issue Date", data.licenceIssueDate],
          ["Expiry Date", data.licenceExpiryDate],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>

        {/* Vehicle Details */}
        <View style={styles.card} >
        <Text style={styles.section}>Vehicle Details</Text>
        {[
          ["Assigned Vehicle", data.assignedVehicle],
          ["Vehicle Number", data.vehicleNumber],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>

        {/* Employment Details */}
        <View style={styles.card} >
        <Text style={styles.section}>Employment Details</Text>
        {[
          ["Joining Date", data.joiningDate],
          ["Employment Type", data.employmentType],
          ["Staff Category", data.staffCategory],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>
        {/* Identity */}
        <View style={styles.card} >
        <Text style={styles.section}>Identity</Text>
        {[
          ["Aadhaar", data.aadhaar],
          ["PAN", data.pan],
        ].map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingBottom: 50 },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 10,
    paddingBottom: 5,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  label: { fontWeight: "600", color: "#fff", flex: 1 },
  value: { color: "#fff", flex: 1, textAlign: "right" },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
   profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  badge: {
    backgroundColor: "#ff9800",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  badgeText: { color: "#fff", fontWeight: "600" },
});

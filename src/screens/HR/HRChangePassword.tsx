import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function StudentChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleChange = () => {
    alert("Password changed successfully");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Old Password</Text>
      <TextInput
        secureTextEntry
        value={oldPass}
        onChangeText={setOldPass}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>New Password</Text>
      <TextInput
        secureTextEntry
        value={newPass}
        onChangeText={setNewPass}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <Button title="Update Password" onPress={handleChange} />
    </View>
  );
}

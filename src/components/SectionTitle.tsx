import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SectionTitle({ title }: any) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 12,
  },
});

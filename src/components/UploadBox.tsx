import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

interface UploadBoxProps {
  label: string;
  onFileSelected?: (file: {
    uri: string;
    name: string;
    type?: string;
  }) => void;
  type?: "image" | "document" | "all";
}

export default function UploadBox({
  label,
  onFileSelected,
  type = "all",
}: UploadBoxProps) {
  const [file, setFile] = useState<{
    uri: string;
    name: string;
    type?: string;
  } | null>(null);

  const handleUpload = async () => {
    try {
      if (type === "image") {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Permission required",
            "Please allow access to your media library."
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          const asset = result.assets[0];

          const fileData = {
            uri: asset.uri,
            name: asset.fileName ?? "image.jpg",
            type: asset.type ?? "image",
          };

          setFile(fileData);
          onFileSelected?.(fileData);
        }
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
        });

        if (!result.canceled) {
          const asset = result.assets[0];

          const fileData = {
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType,
          };

          setFile(fileData);
          onFileSelected?.(fileData);
        }
      }
    } catch (error) {
      Alert.alert("Upload Error", "Something went wrong.");
    }
  };

  return (
    <TouchableOpacity style={styles.box} onPress={handleUpload}>
      {/* LABEL ALWAYS VISIBLE */}
      <Text style={styles.label}>{label}</Text>

      {file ? (
        file.type?.includes("image") ? (
          <>
            <Image source={{ uri: file.uri }} style={styles.preview} />
            <Text style={styles.changeText}>Tap to change image</Text>
          </>
        ) : (
          <Text style={styles.fileName}>{file.name}</Text>
        )
      ) : (
        <Text style={styles.subText}>Tap to upload</Text>
      )}
    </TouchableOpacity>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.53)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 14,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  subText: {
    color: "#000",
    fontSize: 12,
  },
  preview: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginVertical: 8,
  },
  changeText: {
    fontSize: 12,
    color: "#2563EB",
  },
  fileName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
  },
});

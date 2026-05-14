import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../../services/postService";

const MobileAddPost = ({ visible, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📸 PICK IMAGE
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // 🚀 SUBMIT POST
  const handleSubmit = async () => {
    if (!title || !price || !category || !description) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", String(price)); // safer for backend
    formData.append("category", String(category));

    if (image) {
      const fileType = image.uri.split(".").pop();

      formData.append("image", {
        uri: image.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const res = await createPost(formData);

      Alert.alert("Success", "Product posted successfully!");

      if (onSuccess) onSuccess(res);

      // RESET FORM
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);

      onClose();
    } catch (err) {
      console.log("POST ERROR:", err);

      Alert.alert(
        "Error",
        err.message || "Failed to post product. Check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
          Add Product
        </Text>

        {/* TITLE */}
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* PRICE */}
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* CATEGORY */}
        <TextInput
          placeholder="Category ID"
          value={category}
          onChangeText={setCategory}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* DESCRIPTION */}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            height: 100,
            marginBottom: 10,
          }}
        />

        {/* IMAGE PICKER */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#ddd",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text>{image ? "Change Image" : "Select Image"}</Text>
        </TouchableOpacity>

        {/* IMAGE PREVIEW */}
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 5,
              marginBottom: 10,
            }}
          />
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#007bff",
            padding: 12,
            borderRadius: 5,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Post Product
            </Text>
          )}
        </TouchableOpacity>

        {/* CLOSE */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: "#dc3545",
            padding: 12,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Close
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default MobileAddPost;
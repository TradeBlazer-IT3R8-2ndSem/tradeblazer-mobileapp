import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { editProfileStyles } from "../../styles/pages/profile/MobileEditProfile";
import { getItem, setItem } from "../../utils/storage";
import { API_URL } from "../../services/api";

const MobileEditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    student_id: "",
    department: "",
    email: "",
    phone_number: "",
    address: "",
    profile_image: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getItem("userData");
      if (userData) {
        setFormData({
          username: userData.username || "",
          student_id: userData.student_id || "",
          department: userData.department || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
          address: userData.address || "",
          profile_image: userData.profile_image || "",
          profilePicture: userData.profile_image
            ? `http://127.0.0.1:8000${userData.profile_image}`
            : "",
          new_password: "",
          confirm_password: "",
        });
      }
    };
    loadUser();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      handleChange("profile_image", result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // Validate password match
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const currentUser = await getItem("userData");
      const token = await getItem("accessToken");

      if (!currentUser?.id) {
        Alert.alert("Error", "User ID missing. Please log in again.");
        return;
      }

      // ✅ Build FormData for multipart (supports image upload)
      const form = new FormData();
      form.append("username", formData.username);
      form.append("student_id", formData.student_id);
      form.append("department", formData.department);
      form.append("email", formData.email);
      form.append("phone_number", formData.phone_number);
      form.append("address", formData.address);

      // ✅ Only append password if user typed a new one
      if (formData.new_password) {
        form.append("password", formData.new_password);
      }

      // ✅ Only append image if it's a new local file (not an existing URL)
      if (
        formData.profile_image &&
        formData.profile_image.startsWith("file://")
      ) {
        const fileType = formData.profile_image.split(".").pop();
        form.append("profile_image", {
          uri: formData.profile_image,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      // ✅ Call Django API to update user
      const response = await fetch(`${API_URL}users/${currentUser.id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type — fetch sets it automatically for FormData
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.detail ||
          data.message ||
          Object.values(data).flat().join("\n") ||
          "Failed to update profile.";
        Alert.alert("Error", message);
        return;
      }

      // ✅ Save updated user to AsyncStorage so it persists locally too
      const updatedUser = {
        ...currentUser,
        username: data.username || formData.username,
        student_id: data.student_id || formData.student_id,
        department: data.department || formData.department,
        email: data.email || formData.email,
        phone_number: data.phone_number || formData.phone_number,
        address: data.address || formData.address,
        profile_image: data.profile_image || formData.profile_image,
      };

      await setItem("userData", updatedUser);

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (e) {
      console.error("Save error:", e);
      Alert.alert("Error", "Failed to update profile. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 15, paddingTop: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginBottom: 20 }}>
          {/* Header */}
          <Text style={[editProfileStyles.name, { textAlign: "center" }]}>
            Edit Profile
          </Text>

          {/* Profile Picture */}
          <TouchableOpacity
            onPress={pickImage}
            style={{
              alignSelf: "center",
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              overflow: "hidden",
            }}
          >
            {formData.profile_image ? (
              <Image
                source={{ uri: formData.profile_image }}
                style={{ width: "100%", height: "100%", borderRadius: 60 }}
              />
            ) : (
              <Text>Select Image</Text>
            )}
          </TouchableOpacity>

          {/* Form Fields */}
          <View style={editProfileStyles.infoBox}>
            <Text>Full Name</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) => handleChange("username", text)}
              style={editProfileStyles.input}
            />

            <Text>Student ID</Text>
            <TextInput
              value={formData.student_id}
              onChangeText={(text) => handleChange("student_id", text)}
              style={editProfileStyles.input}
            />

            <Text>Department</Text>
            <TextInput
              value={formData.department}
              onChangeText={(text) => handleChange("department", text)}
              style={editProfileStyles.input}
            />

            <Text>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              style={editProfileStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text>Phone Number</Text>
            <TextInput
              value={formData.phone_number}
              onChangeText={(text) => handleChange("phone_number", text)}
              style={editProfileStyles.input}
              keyboardType="phone-pad"
            />

            <Text>Address</Text>
            <TextInput
              value={formData.address}
              onChangeText={(text) => handleChange("address", text)}
              style={editProfileStyles.input}
            />
          </View>

          {/* Change Password Section */}
          <View style={[editProfileStyles.infoBox, { marginTop: 20 }]}>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              Change Password
            </Text>
            <Text>New Password</Text>
            <TextInput
              value={formData.new_password}
              onChangeText={(text) => handleChange("new_password", text)}
              style={editProfileStyles.input}
              secureTextEntry
            />
            <Text>Confirm New Password</Text>
            <TextInput
              value={formData.confirm_password}
              onChangeText={(text) => handleChange("confirm_password", text)}
              style={editProfileStyles.input}
              secureTextEntry
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              editProfileStyles.saveBtn,
              { alignSelf: "center", opacity: loading ? 0.6 : 1 },
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={editProfileStyles.saveText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MobileEditProfile;
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { editProfileStyles } from "../../styles/pages/profile/MobileEditProfile";
import { getItem, setItem } from "../../utils/storage";

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

  // Load user data from AsyncStorage
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
    try {
      const currentUser = await getItem("userData");

      if (!currentUser?.id) {
        Alert.alert("Error", "User ID missing.");
        return;
      }

      // Validate password match if user entered a new password
      if (formData.new_password && formData.new_password !== formData.confirm_password) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      const updatedUser = {
        ...currentUser,
        username: formData.username,
        student_id: formData.student_id,
        department: formData.department,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        profile_image: formData.profile_image,
        // Only update password if user entered a new one
        ...(formData.new_password ? { password: formData.new_password } : {}),
      };

      await setItem("userData", updatedUser);

      const users = (await getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === currentUser.id ? updatedUser : u
      );

      await setItem("users", updatedUsers);

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to update profile.");
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
        <Text style={[editProfileStyles.name, { textAlign: 'center' }]}>Edit Profile</Text>

        {/* Profile Picture */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            overflow: 'hidden',
          }}
        >
          {formData.profile_image ? (
            <Image
              source={{ uri: formData.profile_image }}
              style={{ width: '100%', height: '100%', borderRadius: 60 }}
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
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Change Password</Text>
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
          style={[editProfileStyles.saveBtn, { alignSelf: 'center' }]}
          onPress={handleSave}
        >
          <Text style={editProfileStyles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
    
    );
};

export default MobileEditProfile;

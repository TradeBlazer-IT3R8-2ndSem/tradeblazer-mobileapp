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
        });
      }
    };
    loadUser();
  }, []);

  // Handle input changes
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Pick an image
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

  // Save changes
const handleSave = async () => {
  try {
    const currentUser = await getItem("userData");

    if (!currentUser?.id) {
      Alert.alert("Error", "User ID missing.");
      return;
    }

    // Merge new values but preserve fields like password, id, original names
    const updatedUser = {
      ...currentUser,   // preserve all original keys
      username: formData.username,
      student_id: formData.student_id,
      department: formData.department,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      profile_image: formData.profile_image,
    };

    await setItem("userData", updatedUser);

    // Update users array
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
<ScrollView contentContainerStyle={editProfileStyles.container}>
  <View style={editProfileStyles.profileLeft}>
    {/* Header */}
    <Text style={editProfileStyles.name}>Edit Profile</Text>

    {/* Profile Picture */}
    <TouchableOpacity onPress={pickImage} style={editProfileStyles.profilePicture}>
      {formData.profile_image ? (
        <Image
          source={{ uri: formData.profile_image }}
          style={editProfileStyles.image}
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

    {/* Save Button moved here, below the inputs */}
    <TouchableOpacity
      style={[editProfileStyles.editBtn, { marginTop: 20, alignSelf: 'center' }]}
      onPress={handleSave}
    >
      <Text style={editProfileStyles.editText}>Save Changes</Text>
    </TouchableOpacity>
  </View>
</ScrollView>

  );
};

export default MobileEditProfile;

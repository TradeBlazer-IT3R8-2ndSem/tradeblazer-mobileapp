import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { profileStyles } from '../../styles/pages/profile/MobileProfile';
import { getItem } from '../../utils/storage'; 
import { useNavigation } from '@react-navigation/native';


const MobileProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation(); // ✅ call the hook

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const userData = await getItem('userData');
      if (userData) {
        setProfile({
          name: userData.username || "User",
          studentId: userData.student_id || "N/A",
          department: userData.department || "N/A",
          email: userData.email || "N/A",
          number: userData.phone_number || "N/A",
          address: userData.address || "N/A",
          profilePicture: userData.profile_image || "",
        });
      }
    };
    loadUser();
  }, []);

  if (!profile) {
    return (
      <View style={profileStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={profileStyles.container}>
      {/* PROFILE SECTION */}
      <View style={profileStyles.profileLeft}>
        {/* Header */}
        <View style={profileStyles.profileHeader}>
        <TouchableOpacity
          style={profileStyles.editBtn}
          onPress={() => navigation.navigate('MobileEditProfile')}
        >
          <Text style={profileStyles.editText}>Edit</Text>
        </TouchableOpacity>

          <View style={profileStyles.profilePicture}>
            {profile.profilePicture ? (
              <Image
                source={{ uri: profile.profilePicture }}
                style={profileStyles.image}
              />
            ) : (
              <Text>No Image</Text>
            )}
          </View>

          <Text style={profileStyles.name}>{profile.name}</Text>
        </View>

        {/* Info */}
        <View style={profileStyles.infoBox}>
          <Text>ID: {profile.studentId}</Text>
          <Text>Department: {profile.department}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Number: {profile.number}</Text>
          <Text>Address: {profile.address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MobileProfile;

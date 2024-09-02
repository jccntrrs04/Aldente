import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NavBar from './NavBar';
import LogoutPop from './LogoutPop';
import { RootStackParamList } from './navigationTypes';
import axios from 'axios';

interface Profile {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Email: string;
  Username: string;
  Address: string;
  PhoneNumber: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profiles'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profiles'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const profileData = route.params.profile as Profile;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: profileData.FirstName,
    lastName: profileData.LastName,
    middleName: profileData.MiddleName,
    email: profileData.Email,
    username: profileData.Username,
    address: profileData.Address,
    phoneNumber: profileData.PhoneNumber,
  });
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://capstone-api-johndev.onrender.com/Patient/auth/Patient', {
          withCredentials: true,
        });
        console.log('API Response:', response.data);
        setProfile({
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          middleName: response.data.MiddleName,
          email: response.data.Email,
          username: response.data.Username,
          address: response.data.Address,
          phoneNumber: response.data.PhoneNumber,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Axios Error:', error.response?.data);
          setError(error.response?.data?.message || 'Failed to fetch profile data');
        } else {
          console.log('Unexpected Error:', error);
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await axios.put('https://capstone-api-johndev.onrender.com/Patient/auth/Update', {
          FirstName: profile.firstName,
          LastName: profile.lastName,
          MiddleName: profile.middleName,
          Email: profile.email,
          Username: profile.username,
        }, {
          withCredentials: true,
        });
        Alert.alert('Success', 'Profile updated successfully');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Axios Error during update:', error.response?.data);
          Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
        } else {
          console.log('Unexpected Error during update:', error);
          Alert.alert('Error', 'An unexpected error occurred');
        }
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleLogoutPress = () => {
    setIsLogoutVisible(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutVisible(false);
    navigation.navigate('SignIn');
  };

  const handleLogoutClose = () => {
    setIsLogoutVisible(false);
  };

  const handleEmailUpdateRequest = async () => {
    try {
      await axios.post('https://capstone-api-johndev.onrender.com/Patient/auth/requestEmailUpdate', {
        newEmail: newEmail,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsOtpVisible(true);
      Alert.alert('Success', 'OTP sent to the new email address');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios Error during email update request:', error.response?.data);
        Alert.alert('Error', error.response?.data?.message || 'Failed to request email update');
      } else {
        console.log('Unexpected Error during email update request:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  const handleOtpVerification = async () => {
    try {
      await axios.post('https://capstone-api-johndev.onrender.com/Patient/auth/verifyEmailUpdateOTP', {
        otp: otp,
        newEmail: newEmail,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Email updated successfully');
      setIsOtpVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios Error during OTP verification:', error.response?.data);
        Alert.alert('Error', error.response?.data?.message || 'Failed to verify OTP');
      } else {
        console.log('Unexpected Error during OTP verification:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <Image
          source={{ uri: 'https://styles.redditmedia.com/t5_82fddg/styles/communityIcon_8v7e2voyac2b1.png' }}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.middleName}
                onChangeText={(value) => handleChange('middleName', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.email}
                onChangeText={(value) => handleChange('email', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.username}
                onChangeText={(value) => handleChange('username', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.address}
                onChangeText={(value) => handleChange('address', value)}
                editable={isEditing}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.readOnly]}
                value={profile.phoneNumber}
                onChangeText={(value) => handleChange('phoneNumber', value)}
                editable={isEditing}
              />
            </View>
            {isEditing && (
              <View style={styles.emailUpdateContainer}>
                <Text style={styles.label}>New Email</Text>
                <TextInput
                  style={styles.input}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder="Enter new email"
                />
                <TouchableOpacity style={styles.updateButton} onPress={handleEmailUpdateRequest}>
                  <Text style={styles.updateButtonText}>Request Email Update</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBar style={styles.navBar} />

      {isLogoutVisible && (
        <LogoutPop
          visible={isLogoutVisible}
          onConfirm={handleLogoutConfirm}
          onClose={handleLogoutClose}
        />
      )}
      
      <Modal visible={isOtpVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify OTP</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleOtpVerification}>
              <Text style={styles.updateButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsOtpVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to ensure content is not hidden behind NavBar
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center', // Center the avatar horizontally
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16,
  },
  editText: {
    fontSize: 16,
    color: '#007BFF',
  },
  form: {
    width: '90%',
    alignSelf: 'center',
  },
  formRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  readOnly: {
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF4D4D',
    borderRadius: 4,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  emailUpdateContainer: {
    marginTop: 16,
  },
  updateButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF4D4D',
    borderRadius: 4,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Set the height of your NavBar
  },
});


export default ProfileScreen;

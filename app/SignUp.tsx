import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from './navigationTypes';
import OtpPopUp from './OtpPopUp';  // Ensure you have the correct path for the OtpPopUp component

const SignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);

  const handleSignUp = async () => {
    const payload = {
      FirstName: firstName,
      LastName: lastName,
      MiddleName: middleName,
      Email: email,
      PhoneNumber: phone,
      Address: address,
      Username: username,
      Password: password,
    };

    try {
      const response = await fetch("https://capstone-final-backend-final-1.onrender.com/Patient/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        setOtpModalVisible(true);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Middle Name</Text>
        <TextInput
          style={styles.input}
          value={middleName}
          onChangeText={setMiddleName}
          placeholder="Middle name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="09XXXXXXXXX"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleSignUp}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {isOtpModalVisible && (
        <OtpPopUp
          username={username} // Changed from email to username
          onClose={() => setOtpModalVisible(false)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20, // Added marginBottom for better spacing at the bottom
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});




export default SignUp;

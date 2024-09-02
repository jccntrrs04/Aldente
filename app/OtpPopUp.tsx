import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { useNavigation, NavigationProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from './navigationTypes';

interface OtpPopUpProps {
  username: string;
  onClose: () => void;
}

const OtpPopUp: React.FC<OtpPopUpProps> = ({ username, onClose }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      console.log("Verifying OTP for username:", username);

      const response = await fetch('https://capstone-api-johndev.onrender.com/Patient/auth/Verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, otp }), // Ensure payload matches API requirements
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          console.log("OTP verified successfully", data);
          onClose();
          navigation.navigate("SignIn"); // Navigate to SignIn after successful OTP verification
        } else {
          Alert.alert("Error", `Failed to verify OTP: ${data.message || "Unknown error"}`);
        }
      } else {
        Alert.alert("Error", `Failed to verify OTP: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      const errorMessage = (error as Error).message || "An unknown error occurred";
      Alert.alert("Error", `An error occurred: ${errorMessage}`);
    }
  };

  return (
    <Modal visible={true} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter OTP</Text>
          <Text style={styles.infoText}>An OTP code has been sent to your email associated with the username {username}</Text>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6} // Assuming OTP is 6 digits
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "gray",
  },
});

export default OtpPopUp;

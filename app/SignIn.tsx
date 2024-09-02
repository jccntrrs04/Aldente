import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./navigationTypes";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";

const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track if login is in progress

  const handleLogin = async () => {
    if (loading) return; // Prevent multiple presses

    try {
      if (!username || !password) {
        Alert.alert("Error", "Username and password cannot be empty.");
        return;
      }

      setLoading(true); // Set loading to true

      const response = await axios.post(
        "https://capstone-api-johndev.onrender.com/Patient/auth/login",
        {
          username,
          Password: password,
        },
        { withCredentials: true } // Include cookies with the request
      );

      console.log("Login successful:", response.data);

      // Navigate to ProfileScreen with the received profile data
      navigation.navigate("HomeOne", { profile: response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error response:", error.response?.data);
        Alert.alert(
          "Error",
          error.response?.data?.message || "An unknown error occurred."
        );
      } else {
        console.error("Unexpected error:", error);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password?");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  // Get screen dimensions and calculate logo height
  const { width: screenWidth } = Dimensions.get("window");
  const originalWidth = 1280;
  const originalHeight = 402;
  const logoHeight = (screenWidth / originalWidth) * originalHeight * 0.8;

  return (
    <View style={styles.container}>
      {/* Logo */}
      {screenWidth && originalWidth && originalHeight ? (
        <Image
          source={require("./images/aldente.jpg")}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
          onError={(error) =>
            console.error("Image loading error:", error.nativeEvent.error)
          }
        />
      ) : (
        <Text>Logo not available</Text>
      )}

      {/* Text Inputs for Username and Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Text */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: Dimensions.get("window").width * 0.8,
    marginBottom: 30,
    marginTop: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "blue",
    marginTop: 10,
  },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Change color when disabled
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  signUpText: {
    marginTop: 20,
  },
  signUpLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignIn;

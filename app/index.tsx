import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation, NavigationContainerRef } from "@react-navigation/native";

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export default function Index() {
  const navigation = useNavigation<NavigationContainerRef<RootStackParamList>>();

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require("./images/teeth.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={navigateToSignIn}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={navigateToSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  signUpButton: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

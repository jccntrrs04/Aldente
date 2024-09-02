
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar'; // Import NavBar component

const NotificationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Your calendar content */}
      <Text style={styles.text}>Notification Coming Soon</Text>

      {/* Render the NavBar component */}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default NotificationScreen;

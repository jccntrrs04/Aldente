import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes'; // Adjust the import path as needed

interface NavBarProps {
  style?: ViewStyle; // Allow custom styles
  initialTab?: keyof RootStackParamList; // Optional: Set initial tab
}

const NavBar: React.FC<NavBarProps> = ({ style, initialTab }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (tab: keyof RootStackParamList) => {
    if (tab === 'HomeOne') {
      navigation.navigate('HomeOne', { profile: { FirstName: '' } });
    } else if (tab === 'Profiles') {
      navigation.navigate('Profiles', {
        profile: {
          FirstName: '',
          LastName: '',
          MiddleName: '',
          Email: '',
          Username: ''
        }
      });
    } else {
      navigation.navigate(tab as any);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => handleTabPress('Calendar')} style={styles.tab}>
        <FontAwesome name="calendar" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('History')} style={styles.tab}>
        <FontAwesome name="history" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('HomeOne')} style={styles.centerTab}>
        <FontAwesome name="home" size={32} color="green" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Notification')} style={styles.tab}>
        <FontAwesome name="bell" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Profiles')} style={styles.tab}>
        <FontAwesome name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Adjust background color as needed
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  centerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff', // Adjust background color as needed
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default NavBar;

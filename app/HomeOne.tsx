  import React, { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
  import axios from 'axios';
  import NavBar from './NavBar';

  const HomeOne: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://capstone-api-johndev.onrender.com/Patient/auth/Patient', {
            withCredentials: true,
          });
          setUserData(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || 'Failed to fetch user data');
          } else {
            setError('An unexpected error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, []);

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: userData?.avatar || 'https://i.pinimg.com/736x/34/c4/be/34c4beb31aae506d6d4ce8c816885ded.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.greeting}>
              Hello, <Text style={styles.name}>{userData?.FirstName || 'User'}</Text>
            </Text>
          </View>

          <Text style={styles.tipsHeader}>Tips from Alejandria’s Dental Clinic</Text>
          <View style={styles.tipsContainer}>
            <TouchableOpacity style={styles.tip} onPress={() => {}}>
              <Text style={styles.tipNumber}>1</Text>
              <Text style={styles.tipText}>Limit sugary foods and starches.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tip} onPress={() => {}}>
              <Text style={styles.tipNumber}>2</Text>
              <Text style={styles.tipText}>See a dentist regularly.</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionHeader}>About Alejandria’s Dental Clinic</Text>
          <View style={styles.aboutClinic}>
            <Text style={styles.aboutText}>
              Alejandria’s Dental Clinic is located in #53 Peso St., St. Michael Homes, Pandayan, Meycauayan City, Bulacan with Dr. Marilie G. Alejandria as the resident dentist.
            </Text>
          </View>

          <Text style={styles.sectionHeader}>Dental History</Text>
          <View style={styles.dentalHistory}>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>May 12, 2023</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>June 15, 2023</Text>
            </View>
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>August 05, 2024</Text>
            </View>
          </View>
        </ScrollView>

        <NavBar />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 60, // Ensure space for the navigation bar
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    greeting: {
      fontSize: 20,
    },
    name: {
      color: 'green',
      fontWeight: 'bold',
    },
    tipsHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tipsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    tip: {
      backgroundColor: '#e0f7fa',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
    },
    tipNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'green',
    },
    tipText: {
      textAlign: 'center',
      marginTop: 10,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    aboutClinic: {
      backgroundColor: '#e8f5e9',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    aboutText: {
      fontSize: 16,
      lineHeight: 22,
      color: '#000',
    },
    dentalHistory: {
      backgroundColor: '#e8f5e9',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    historyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    historyText: {
      marginLeft: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
  });

  export default HomeOne;

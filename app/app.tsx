import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from './index';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import CreatePassword from './CreatePassword';
import HomeOne from './HomeOne';
import CalendarScreen from './Calendar';
import HistoryScreen from './History';
import NotificationScreen from './Notification';
import ProfileScreen from './Profiles';
// import LogoutPop from './LogoutPop';
// import OtpPopUp from './OtpPopUp';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Index" component={Index} />
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
        {/* <Tab.Screen name="CreatePassword" component={CreatePassword} /> */}
        <Tab.Screen name="HomeOne" component={HomeOne} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Notification" component= {NotificationScreen} />
        <Tab.Screen name="Profiles" component= {ProfileScreen} />
        {/* <Tab.Screen name ="OtpPopUp" component={OtpPopUp}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;

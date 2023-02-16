import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../main/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../main/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Challange from '../main/Challange';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChooseLang from '../main/ChooseLang';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const user = useSelector((state) => state.userAuth.user);

  if (user !== null) {
    if (user.currentLang === null) {
      return <ChooseLang />;
    }
  }

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: 'Anasayfa',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Challange"
          component={Challange}
          options={{
            headerShown: false,
            tabBarLabel: 'Meydan Oku',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="medal" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={Profile}
          options={{
            headerShown: false,
            tabBarLabel: 'Profil',
            headerTitle: '',

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppNavigator;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
const Tab = createBottomTabNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Challenge from '../main/Challange';
import ProfileMain from '../main/ProfileMain';
import Home from '../main/Home';
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="TabHome">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Anasayfa',

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="TabHome"
        component={Home}
      />
      <Tab.Screen
        name="Challenge"
        component={Challenge}
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
        component={ProfileMain}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          headerTitle: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

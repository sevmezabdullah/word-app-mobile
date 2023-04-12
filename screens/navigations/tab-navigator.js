import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
const Tab = createBottomTabNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, tr, gb, ar } from '../../constants/localizations.json';
import { getLocales } from 'expo-localization';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Challenge from '../main/Challange';
import ProfileMain from '../main/ProfileMain';
import Home from '../main/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearWords } from '../../redux/slices/categorySlice';
const TabNavigator = () => {
  const i18n = new I18n({ tr, en, ar, gb });
  const locale = getLocales();
  const lang = locale[0].languageCode;
  i18n.locale = lang;

  const home = i18n.t('homeBottomLabelText');
  const challange = i18n.t('challangeBottomLabelText');
  const profile = i18n.t('profilBottomLabelText');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearWords());
  }, [dispatch]);
  return (
    <Tab.Navigator initialRouteName="TabHome">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: home,

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
          tabBarLabel: challange,
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
          tabBarLabel: profile,
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

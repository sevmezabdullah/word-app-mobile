import { StyleSheet } from 'react-native';
import React from 'react';

import { colors } from '../../constants/colors';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from './Settings';
import ProfileMain from './ProfileMain';
const Stack = createNativeStackNavigator();
const Profile = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileMain}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTitle: 'Ayarlar' }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

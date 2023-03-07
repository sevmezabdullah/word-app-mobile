import { StyleSheet } from 'react-native';
import React from 'react';

import { colors } from '../../constants/colors';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from './Settings';
import ProfileMain from './ProfileMain';
const Stack = createNativeStackNavigator();
const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>Data</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

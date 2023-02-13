import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
const ProfileMain = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end' }}>
        <MaterialCommunityIcons
          style={{ marginRight: 20, marginTop: 40 }}
          name="cog"
          size={36}
          color={'white'}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </View>
    </View>
  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

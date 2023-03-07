import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
const ProfileMain = ({ navigation }) => {
  const user = useSelector((state) => state.userAuth.user);

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
      <View style={styles.profile}>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
          <View style={styles.avatar}></View>
        </View>

        <View></View>
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
  avatar: {
    width: 100,
    height: 100,
    elevation: 5,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  profile: {
    flex: 1,
    flexDirection: 'column',
  },
});

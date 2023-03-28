import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { Card } from 'react-native-paper';
import Stat from '../../components/ui/profile/Stat';
import { useState } from 'react';
import Awards from '../../components/ui/profile/Awards';
import ChangeImageButton from '../../components/ui/profile/ChangeImageButton';
const ProfileMain = ({ navigation }) => {
  const user = useSelector((state) => state.userAuth.user);

  const [selected, setSelected] = useState('stat');
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
          <View style={styles.avatar}>
            <ChangeImageButton />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',

          width: 400,
          height: 500,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 60,
            elevation: 6,
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View style={{ width: '42%', margin: 5 }}>
            <Button
              onPress={() => {
                setSelected('awards');
              }}
              title="Başarımlar"
            />
          </View>
          <View
            style={{
              width: '42%',
              height: 80,
              margin: 5,
            }}
          >
            <Button
              onPress={() => {
                setSelected('stat');
              }}
              title="İstatistikler"
            />
          </View>
        </View>
        {selected === 'stat' ? <Stat /> : <Awards />}
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

    borderRadius: 50,
    flexDirection: 'column',
  },

  profile: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import CountryFlag from 'react-native-country-flag';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from '../../constants/langSupport';
import Stat from '../../components/ui/profile/Stat';
import { useState } from 'react';
import Awards from '../../components/ui/profile/Awards';
import { useEffect } from 'react';
import { getUserAwards } from '../../redux/slices/authSlice';

const ProfileMain = ({ navigation }) => {
  const user = useSelector((state) => state.userAuth.user);
  const [selected, setSelected] = useState('award');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAwards({ userId: user.id }));
  }, [dispatch]);
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View>
            <Text style={{ color: 'white', fontSize: 16 }}>
              {user.name + ' ' + user.surname}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 14 }}>
            Öğrenilen Dil
          </Text>
        </View>
        <View style={{ alignSelf: 'center', margin: 10 }}>
          <CountryFlag isoCode={user.currentLang} size={24} />
        </View>
        <View style={{ alignSelf: 'center', margin: 4 }}>
          <Text style={{ color: 'white', fontSize: 14 }}>
            {'Level : ' + user.level}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}></View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          height: '66%',
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
              title={i18n.t('awards')}
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
              title={i18n.t('stats')}
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
    marginTop: '40%',
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

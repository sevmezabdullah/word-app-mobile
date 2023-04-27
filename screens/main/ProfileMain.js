import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
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
import {
  getUserAwards,
  getUserDailiyWordCount,
  getUserFromServer,
} from '../../redux/slices/authSlice';
import * as Progress from 'react-native-progress';
import { ActivityIndicator, Dialog } from 'react-native-paper';
import Background from '../../components/background/Background';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ProfileMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.user);
  const getUserStatus = useSelector((state) => state.userAuth.getUserStatus);
  const dailyWordCount = useSelector((state) => state.userAuth.dailiyWordCount);
  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getUserFromServer());
      dispatch(getUserAwards());
      dispatch(getUserDailiyWordCount());
    });
  }, [dispatch]);

  const [selected, setSelected] = useState('award');
  const [targetWordDialog, setTargetWordDialog] = useState(false);

  const closeTargetWordDialog = () => {
    setTargetWordDialog(false);
  };

  if (getUserStatus === 'fulfilled') {
    return (
      <Background
        component={
          <View>
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
              <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Text
                    style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}
                  >
                    {i18n.t('dailyWordTargetMessage')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setTargetWordDialog(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ marginLeft: 10, elevation: 5 }}
                      name="information"
                      size={18}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.circles}>
                <Progress.Circle
                  size={100}
                  style={styles.progress}
                  thickness={8}
                  progress={dailyWordCount / 100}
                  color="white"
                  showsText={true}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View>
                  <Text style={{ color: 'white', fontSize: 16 }}>
                    {user.name + ' ' + user.surname}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{ textAlign: 'center', color: 'white', fontSize: 14 }}
                >
                  {i18n.t('learningLang')}
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
                    color={'#1B2331'}
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
                    color={'#1B2331'}
                    onPress={() => {
                      setSelected('stat');
                    }}
                    title={i18n.t('stats')}
                  />
                </View>
              </View>
              {selected === 'stat' ? <Stat /> : <Awards />}
            </View>
            <Dialog
              dismissable={true}
              onDismiss={closeTargetWordDialog}
              visible={targetWordDialog}
            >
              <Dialog.Title>{i18n.t('targetWordDialogTitle')}</Dialog.Title>
              <Dialog.Content>
                <Text>{i18n.t('targetWordDialogContent')}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={closeTargetWordDialog}
                  title={i18n.t('close')}
                  color={'red'}
                />
              </Dialog.Actions>
            </Dialog>
          </View>
        }
      />
    );
  } else if (getUserStatus === 'pending') {
    return (
      <Background
        component={
          <View style={{ height: '100%', flexDirection: 'column' }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}
            >
              <ActivityIndicator color="white" />
            </View>
          </View>
        }
      />
    );
  }
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
    marginTop: '10%',
    flexDirection: 'column',
  },
  circles: {
    alignItems: 'center',
    justifyContent: 'center',
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
  progress: {
    width: 100,
    height: 100,
    margin: 8,
  },
});

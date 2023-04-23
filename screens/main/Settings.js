import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Button,
  Image,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRequest,
  logout,
  resetProcess,
  changePassword,
} from '../../redux/slices/authSlice';
import SettingButton from '../../components/ui/settings/SettingButton';
import { Dialog } from 'react-native-paper';
import { i18n } from '../../constants/langSupport';
import SocialButton from '../../components/ui/profile/SocialButton';
import FacebookLogo from '../../assets/facebook.png';
import InstagramLogo from '../../assets/instagram.png';
import YoutubeLogo from '../../assets/youtube.png';
import ChangeLangPrefs from '../../components/ui/settings/ChangeLangPrefs';
import Background from '../../components/background/Background';
const FACEBOOK_IMAGE = Image.resolveAssetSource(FacebookLogo).uri;
const INSTAGRAM_LOGO = Image.resolveAssetSource(InstagramLogo).uri;
const YOUTUBE_LOGO = Image.resolveAssetSource(YoutubeLogo).uri;
const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth.user);
  const requestStatus = useSelector((state) => state.userAuth.requestStatus);
  const [message, setMessage] = useState('');
  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false);
  const [changeLangDialog, setChangeLangDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [resetProccessDialog, setResetProcessDialog] = useState(false);
  const [contactWithUSDialog, setContactWithUsDialog] = useState(false);
  const showPasswordModal = () => setVisiblePasswordModal(true);
  const hidePasswordModal = () => setVisiblePasswordModal(false);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  const logoutAlert = () => {
    Alert.alert(i18n.t('logout'), i18n.t('logoutMessage'), [
      { text: i18n.t('cancel'), onPress: () => {} },
      {
        text: i18n.t('signout'),
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  const closeResetProcessDialog = () => {
    setResetProcessDialog(false);
  };
  const passwordChangeHandler = (text) => {
    setPassword(text);
  };
  const rePaswordHandler = (text) => {
    setRepassword(text);
  };

  const changePasswordUI = () => {
    dispatch(changePassword({ userId: user.id, password: password }));
  };
  const openContactDialog = () => {
    setContactWithUsDialog(true);
  };
  const closeContactDialog = () => {
    setMessage('');
    setContactWithUsDialog(false);
  };

  const closeChangeLangDialog = () => {
    setChangeLangDialog(false);
  };

  return (
    <>
      <Background
        component={
          <View style={{ height: '100%' }}>
            <SettingButton
              title={i18n.t('changePasswordText')}
              onPress={() => {
                showPasswordModal();
              }}
              icon="lock"
              isModalEnable={false}
            />
            <SettingButton
              title={i18n.t('changeLangPrefs')}
              onPress={() => {
                setChangeLangDialog(true);
              }}
              icon="call-split"
              isModalEnable={false}
            />
            <SettingButton
              title={i18n.t('resetProcess')}
              onPress={() => {
                //showAlert();
                setResetProcessDialog(true);
              }}
              icon="backup-restore"
            />

            <SettingButton
              title={i18n.t('contactWithUs')}
              onPress={openContactDialog}
              icon="email"
            />

            <SettingButton
              title={i18n.t('logout')}
              onPress={logoutAlert}
              icon="logout"
            />
          </View>
        }
      />

      <Dialog
        style={styles.dialog}
        visible={visiblePasswordModal}
        onDismiss={() => {
          setVisiblePasswordModal(false);
        }}
      >
        <Dialog.Title style={{ color: 'white' }}>
          {i18n.t('changePasswordText')}
        </Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextInput
              onChangeText={passwordChangeHandler}
              secureTextEntry={true}
              placeholder={i18n.t('password')}
              style={styles.input}
            />
            <TextInput
              onChangeText={rePaswordHandler}
              secureTextEntry={true}
              placeholder={i18n.t('passwordAgain')}
              style={styles.input}
            />
          </View>
          {password !== rePassword ? (
            <Text style={{ textAlign: 'left' }}>Şifreler aynı değil</Text>
          ) : (
            <View></View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 5 }}>
            <Button
              color={'red'}
              onPress={() => {
                setVisiblePasswordModal(false);
              }}
              title={i18n.t('close')}
            />
          </View>
          <Button
            color={'#1B2331'}
            onPress={() => {
              changePasswordUI();
            }}
            title={i18n.t('change')}
          />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        style={styles.dialog}
        onDismiss={closeResetProcessDialog}
        visible={resetProccessDialog}
      >
        <Dialog.Title style={{ color: 'white' }}>
          {i18n.t('resetProcess')}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: 'white' }}>
            {i18n.t('areYouSureResetProcess')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 10 }}>
            <Button
              onPress={closeResetProcessDialog}
              color={'red'}
              title={i18n.t('cancel')}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                dispatch(resetProcess({ userId: user.id }));
                closeResetProcessDialog();
              }}
              color={'#1B2331'}
              title={i18n.t('reset')}
            />
          </View>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        style={styles.dialog}
        onDismiss={closeContactDialog}
        visible={contactWithUSDialog}
      >
        <Dialog.Title>{i18n.t('contactWithUs')}</Dialog.Title>
        <Dialog.Content>
          <View>
            <TextInput
              multiline={true}
              value={message}
              style={{
                width: '100%',
                textAlignVertical: 'top',
                height: 200,
                textAlign: 'left',
                padding: 10,
                borderWidth: 1,
              }}
              onChangeText={(text) => {
                setMessage(text);
              }}
              placeholder={i18n.t('yourMessage')}
            />
          </View>
          {/*           <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              height: 150,
              borderRadius: 7,
            }}
          ></View> */}
          <View style={styles.socialButtons}>
            <SocialButton icon={FACEBOOK_IMAGE} />
            <SocialButton icon={YOUTUBE_LOGO} />
            <SocialButton icon={INSTAGRAM_LOGO} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 10 }}>
            <Button
              onPress={closeContactDialog}
              color={'red'}
              title={i18n.t('cancel')}
            />
          </View>
          <Button
            onPress={() => {
              dispatch(createRequest({ userId: user.id, message: message }));
              if (requestStatus === 'fulfilled') {
                showToast('Talep oluşturuldu');
              }
              closeContactDialog();
            }}
            title={i18n.t('send')}
          />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={changeLangDialog}
        onDismiss={closeChangeLangDialog}
        dismissible={true}
      >
        <Dialog.Title>{i18n.t('changeLangPrefs')}</Dialog.Title>
        <Dialog.Content>
          <ChangeLangPrefs onClose={closeChangeLangDialog} />
        </Dialog.Content>
        <Dialog.Actions>
          <View>
            <Button
              onPress={closeChangeLangDialog}
              color={'red'}
              title={i18n.t('close')}
            />
          </View>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: 300,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
    margin: 10,
    padding: 10,
  },
  label: {
    alignItems: 'flex-start',
    fontSize: 18,
  },
  socialButtons: {
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dialog: {
    backgroundColor: '#6B7BA0',
  },
});

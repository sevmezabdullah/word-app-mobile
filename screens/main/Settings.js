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
} from '../../redux/slices/authSlice';
import SettingButton from '../../components/ui/settings/SettingButton';
import { Dialog } from 'react-native-paper';

import SocialButton from '../../components/ui/profile/SocialButton';
import FacebookLogo from '../../assets/facebook.png';
import InstagramLogo from '../../assets/instagram.png';
import YoutubeLogo from '../../assets/youtube.png';

const FACEBOOK_IMAGE = Image.resolveAssetSource(FacebookLogo).uri;
const INSTAGRAM_LOGO = Image.resolveAssetSource(InstagramLogo).uri;
const YOUTUBE_LOGO = Image.resolveAssetSource(YoutubeLogo).uri;
const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth.user);
  const requestStatus = useSelector((state) => state.userAuth.requestStatus);
  const [message, setMessage] = useState('');
  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [resetProccessDialog, setResetProcessDialog] = useState(false);
  const [contactWithUSDialog, setContactWithUsDialog] = useState(false);
  const showPasswordModal = () => setVisiblePasswordModal(true);
  const hidePasswordModal = () => setVisiblePasswordModal(false);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  const logoutAlert = () => {
    Alert.alert('Çıkış', 'Çıkış yapmak istediğinizden emin misiniz ? ', [
      { text: 'Vazgeç', onPress: () => {} },
      {
        text: 'Çıkış',
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
  const openContactDialog = () => {
    setContactWithUsDialog(true);
  };
  const closeContactDialog = () => {
    setMessage('');
    setContactWithUsDialog(false);
  };

  const changePasswordAlert = () => {
    Alert.alert('Şifre Değiştir', '', [
      { text: 'Vazgeç', onPress: () => {} },
      {
        text: 'Değiştir',
        onPress: () => {},
      },
    ]);
  };
  return (
    <>
      <View>
        <SettingButton
          title="Şifre Değiştir"
          onPress={() => {
            showPasswordModal();
          }}
          icon="lock"
          isModalEnable={false}
        />
        <SettingButton
          title="Dil Tercihlerini Değiştir"
          onPress={() => {}}
          icon="call-split"
          isModalEnable={false}
        />
        <SettingButton
          title="İlerlemeyi Sıfırla"
          onPress={() => {
            //showAlert();
            setResetProcessDialog(true);
          }}
          icon="backup-restore"
        />

        <SettingButton
          title="Bize Ulaşın"
          onPress={openContactDialog}
          icon="email"
        />

        <SettingButton
          title="Çıkış Yap"
          onPress={() => {
            logoutAlert();
          }}
          icon="logout"
        />
      </View>
      <Dialog
        style={styles.dialog}
        visible={visiblePasswordModal}
        onDismiss={() => {
          setVisiblePasswordModal(false);
        }}
      >
        <Dialog.Title>Şifre Değiştir</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextInput placeholder="Şifre" style={styles.input} />
            <TextInput placeholder="Şifre Tekrar" style={styles.input} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 5 }}>
            <Button
              color={'red'}
              onPress={() => {
                setVisiblePasswordModal(false);
              }}
              title="Kapat"
            />
          </View>
          <Button title="Değiştir" />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        style={styles.dialog}
        onDismiss={closeResetProcessDialog}
        visible={resetProccessDialog}
      >
        <Dialog.Title>İlerlemeyi Sıfırla</Dialog.Title>
        <Dialog.Content>
          <Text>İlerlemeyi sıfırlamak istediğinden emin misin ?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 10 }}>
            <Button
              onPress={closeResetProcessDialog}
              color={'red'}
              title="Vazgeç"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                dispatch(resetProcess(user.id));
                closeResetProcessDialog();
              }}
              title="Sıfırla"
            />
          </View>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        style={styles.dialog}
        onDismiss={closeContactDialog}
        visible={contactWithUSDialog}
      >
        <Dialog.Title>Bize Ulaş</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              height: 150,
              borderRadius: 7,
            }}
          >
            <TextInput
              multiline={true}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
              placeholder="Mesajınız"
            />
          </View>
          <View style={styles.socialButtons}>
            <SocialButton icon={FACEBOOK_IMAGE} />
            <SocialButton icon={YOUTUBE_LOGO} />
            <SocialButton icon={INSTAGRAM_LOGO} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={{ margin: 10 }}>
            <Button onPress={closeContactDialog} color={'red'} title="Vazgeç" />
          </View>
          <Button
            onPress={() => {
              dispatch(createRequest({ userId: user.id, message: message }));
              if (requestStatus === 'fulfilled') {
                showToast('Talep oluşturuldu');
              }
              closeContactDialog();
            }}
            title="Gönder"
          />
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
    backgroundColor: 'white',
  },
});

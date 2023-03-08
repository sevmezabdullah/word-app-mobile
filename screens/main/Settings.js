import { StyleSheet, View, Text, Alert, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import SettingButton from '../../components/ui/settings/SettingButton';
import { Modal, Provider, Portal, Dialog } from 'react-native-paper';
import LoginInput from '../../components/ui/auth/LoginInput';

const Settings = () => {
  const dispatch = useDispatch();

  const [visiblePasswordModal, setVisiblePasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const showPasswordModal = () => setVisiblePasswordModal(true);
  const hidePasswordModal = () => setVisiblePasswordModal(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 80,
    margin: 16,
    borderRadius: 5,
  };
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

  const passwordChangeHandler = (text) => {
    setPassword(text);
  };

  const contactAlert = () => {};
  const resetProcessAlert = () => {};
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
            //   showAlert();
          }}
          icon="lock"
          isModalEnable={false}
        />

        <SettingButton
          title="İlerlemeyi Sıfırla"
          onPress={() => {
            //showAlert();
          }}
          icon="backup-restore"
        />

        <SettingButton
          title="Bize Ulaşın"
          onPress={() => {
            //      showAlert();
          }}
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
              onPress={() => {
                setVisiblePasswordModal(false);
              }}
              title="Kapat"
            />
          </View>
          <Button title="Değiştir" />
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
});

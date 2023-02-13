import { StyleSheet, View, Text, Alert, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import SettingButton from '../../components/ui/settings/SettingButton';
import { Modal, Provider, Portal } from 'react-native-paper';
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
    <Provider>
      <View>
        <Portal>
          <Modal
            visible={visiblePasswordModal}
            contentContainerStyle={containerStyle}
            onDismiss={hidePasswordModal}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Text style={styles.label}>Şifre Değiştir</Text>
              <TextInput placeholder="Şifre" style={styles.input} />
              <TextInput placeholder="Şifre Tekrar" style={styles.input} />
            </View>
          </Modal>
        </Portal>

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
    </Provider>
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

import { StyleSheet, View, StatusBar } from 'react-native';
import { colors } from '../../constants/colors';
import React, { useState, useEffect } from 'react';
import LoginInput from '../../components/ui/auth/LoginInput';
import SignButton from '../../components/ui/auth/SignButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../../redux/slices/authSlice';
import { getLocales } from 'expo-localization';
import { i18n } from '../../constants/langSupport';
import Background from '../../components/background/Background';
const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const emailChangeHandler = (email) => {
    setEmail(email);
  };

  const nameChangeHandler = (name) => {
    setName(name);
  };

  const surnameChangeHandler = (surname) => {
    setSurname(surname);
  };

  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const rePasswordHandler = (repassword) => {
    setRePassword(repassword);
  };

  const loginIcon = <Icon name="sign-in" color={'white'} size={30} />;
  const registerIcon = <Icon name="user-plus" color={'white'} size={30} />;
  const handleRegister = () => {
    const locale = getLocales();
    const lang = locale[0].languageCode;
    const user = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      lang: lang,
    };
    dispatch(register(user)).unwrap();
  };
  return (
    <Background
      component={
        <View style={styles.body}>
          <View style={{ marginTop: 75 }}>
            <LoginInput
              placeHolder="Email"
              secureTextEntry={false}
              value={email}
              inputHandler={emailChangeHandler}
            />
          </View>

          <View style={styles.personalContainer}>
            <View
              style={{
                flex: 1,
              }}
            >
              <LoginInput
                inputHandler={nameChangeHandler}
                placeHolder={'Ad'}
                value={name}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <LoginInput
                value={surname}
                inputHandler={surnameChangeHandler}
                placeHolder={'Soyad'}
              />
            </View>
          </View>

          <LoginInput
            secureTextEntry={true}
            inputHandler={passwordChangeHandler}
            value={password}
            placeHolder={'Şifre'}
          />
          <LoginInput
            secureTextEntry={true}
            value={rePassword}
            inputHandler={rePasswordHandler}
            placeHolder={'Şifre Tekrar'}
          />
          <SignButton
            onPress={handleRegister}
            icon={registerIcon}
            color={colors.sign_button}
            title={i18n.t('register')}
          />
          <SignButton
            icon={loginIcon}
            color={colors.sign_button}
            onPress={() => {
              navigation.navigate('Login');
            }}
            title={'Zaten üye misin ? Giriş Yap'}
          />

          <SignButton
            onPress={() => {
              setEmail('abdullahsevmez@gmail.com');
              setName('Abdullah');
              setPassword('123456');
              setRePassword('123456');
              setSurname('Sevmez');
            }}
            icon={registerIcon}
            color={colors.sign_button}
            title={'Test Verisi Doldur'}
          />
        </View>
      }
    />
  );
};

export default Register;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    height: '100%',
    padding: 8,
    flexDirection: 'column',
    paddingTop: StatusBar.currentHeight,
  },
  personalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import LoginInput from '../../components/ui/LoginInput';
import ForgetPasswordText from '../../components/ui/ForgetPasswordText';
import SignButton from '../../components/ui/SignButton';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/slices/authSlice';
import { getLocales } from 'expo-localization';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userAuth.status);
  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    const locale = getLocales();
    const lang = locale[0].languageCode;
    const auth = {
      email: email,
      password: password,
      lang: lang,
    };
    dispatch(signIn(auth)).unwrap();
  };
  const loginIcon = <Icon name="sign-in" color={'white'} size={30} />;
  const googleIcon = <Icon name="google" color={'white'} size={30} />;
  const registerIcon = (
    <MaterialCommunityIcons name="account-group" color={'white'} size={30} />
  );
  return (
    <View style={styles.body}>
      <View></View>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={status === 'loading' ? true : false}
        //Text with the Spinner
        textContent={'Giriş yapılıyor'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <LoginInput
        secureTextEntry={false}
        value={email}
        inputHandler={emailChangeHandler}
        placeHolder={'Email'}
      />
      <View>
        <LoginInput
          secureTextEntry={true}
          keyboardType="password"
          value={password}
          inputHandler={passwordChangeHandler}
          placeHolder={'Şifre'}
        />
      </View>

      <ForgetPasswordText />
      <SignButton
        title="Giriş Yap"
        icon={loginIcon}
        color={colors.sign_button}
        onPress={handleLogin}
      />

      <SignButton
        title="Google ile Giriş Yap "
        icon={googleIcon}
        color={colors.sign_button}
      />
      <SignButton
        title="Kayıt Ol"
        icon={registerIcon}
        color={colors.sign_button}
        onPress={handleRegister}
      />
      <SignButton
        title="Test Verisi Gir"
        icon={registerIcon}
        color={colors.sign_button}
        onPress={() => {
          setEmail('abdullahsevmez@gmail.com');
          setPassword('123456');
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import LoginInput from '../../components/ui/auth/LoginInput';
import ForgetPasswordText from '../../components/ui/auth/ForgetPasswordText';
import SignButton from '../../components/ui/auth/SignButton';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignIn, signIn } from '../../redux/slices/authSlice';
import { getLocales } from 'expo-localization';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { i18n } from '../../constants/langSupport';
import Background from '../../components/background/Background';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const googleToken = useSelector((state) => state.userAuth.googleToken);
  const status = useSelector((state) => state.userAuth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '890870231803-5fl351sdtcie804hd6o5cjobncf72n45.apps.googleusercontent.com',
    webClientId:
      '890870231803-jtq964b70t3r92uun5sjtb4pht7g62cs.apps.googleusercontent.com',
  });
  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      if (user.error === null || user.error === undefined) {
        setUserInfo(user);
        dispatch(googleSignIn(user));
      }
    } catch (error) {
      // Add your own error handler here
      console.log(error);
    }
  };

  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const loginWithGoogle = async () => {
    await promptAsync();
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

    dispatch(signIn(auth));
  };
  const loginIcon = <Icon name="sign-in" color={'white'} size={30} />;
  const googleIcon = <Icon name="google" color={'white'} size={30} />;
  const registerIcon = (
    <MaterialCommunityIcons name="account-group" color={'white'} size={30} />
  );
  return (
    <Background
      component={
        <View style={styles.body}>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={status === 'loading' ? true : false}
            //Text with the Spinner
            textContent={i18n.t('logging')}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
          <LoginInput
            secureTextEntry={false}
            value={email}
            inputHandler={emailChangeHandler}
            placeHolder={i18n.t('emailPlaceHolder')}
          />
          <View>
            <LoginInput
              secureTextEntry={true}
              keyboardType="password"
              value={password}
              inputHandler={passwordChangeHandler}
              placeHolder={i18n.t('passwordPlaceHolder')}
            />
          </View>

          <ForgetPasswordText navigation={navigation} />
          <SignButton
            title={i18n.t('loginButtonText')}
            icon={loginIcon}
            color={colors.sign_button}
            onPress={handleLogin}
          />

          <SignButton
            title={i18n.t('signInWithGoogleText')}
            icon={googleIcon}
            color={colors.sign_button}
            onPress={loginWithGoogle}
          />
          <SignButton
            title={i18n.t('registerButtonText')}
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
      }
    />
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

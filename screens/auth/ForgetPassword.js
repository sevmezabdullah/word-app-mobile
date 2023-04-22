import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Background from '../../components/background/Background';
import LoginInput from '../../components/ui/auth/LoginInput';
import { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  return (
    <Background
      component={
        <View style={styles.container}>
          <View style={styles.input}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              Şifreni mi unuttun ?
            </Text>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: '20%' }}>
              Hesabına kayıtlı email adresiyle şifre sıfırlama talimatlarını
              takip ederek şifreni sıfırlayabilirsin .
            </Text>
            <LoginInput
              placeHolder={'Email'}
              inputHandler={emailChangeHandler}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: '#1B2331',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                }}
              >
                Gönder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  input: {
    marginBottom: '24%',
  },
});

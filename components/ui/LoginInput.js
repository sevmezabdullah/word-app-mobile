import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const LoginInput = ({ placeHolder, value, inputHandler, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeHolder}
        value={value}
        onChangeText={inputHandler}
        style={styles.input}
      />
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
  },
  container: {},
});

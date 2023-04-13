import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import SignButton from '../../components/ui/auth/SignButton';
import { colors } from '../../constants/colors';
import ChangeLangPrefs from '../../components/ui/settings/ChangeLangPrefs';
const ChooseLang = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}></View>
      <ChangeLangPrefs />
    </View>
  );
};

export default ChooseLang;

const styles = StyleSheet.create({
  lottieContainer: {},
  currentLang: { paddingTop: 40 },
  nativeLang: { paddingTop: 20, margin: 10 },
  container: { marginTop: 40, marginHorizontal: 10 },
});

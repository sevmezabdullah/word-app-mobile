import { StyleSheet, View } from 'react-native';
import React from 'react';

import { i18n } from '../../../constants/langSupport';
import { useState } from 'react';
import Stepper from 'react-native-stepper-ui';
import NativeLangDrop from './NativeLangDrop';
import CurrentLangDrop from './CurrentLangDrop';
import { useDispatch, useSelector } from 'react-redux';
import { updateLang } from '../../../redux/slices/authSlice';
const ChangeLangPrefs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nativeLang, setNativeLang] = useState(null);
  const [currentLang, setCurrentLang] = useState(null);
  const user = useSelector((state) => state.userAuth.user);
  const dispatch = useDispatch();
  const content = [
    <NativeLangDrop setNativeLang={setNativeLang} />,
    <CurrentLangDrop setCurrentLang={setCurrentLang} />,
  ];
  return (
    <View>
      <Stepper
        active={activeIndex}
        content={content}
        finishText={i18n.t('save')}
        backText={i18n.t('back')}
        onNext={() => {
          setActiveIndex((p) => p + 1);
        }}
        onBack={() => {
          setActiveIndex((p) => p - 1);
        }}
        onFinish={() => {
          console.log(nativeLang, currentLang);
          dispatch(
            updateLang({
              userId: user.id,
              nativeLang: nativeLang,
              currentLang: currentLang,
            })
          ).unwrap();
        }}
      />
    </View>
  );
};

export default ChangeLangPrefs;

const styles = StyleSheet.create({
  currentLang: { paddingTop: 40 },
  nativeLang: { paddingTop: 20, margin: 10 },
});

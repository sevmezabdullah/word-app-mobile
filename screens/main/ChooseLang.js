import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLang } from '../../redux/slices/authSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import SignButton from '../../components/ui/auth/SignButton';
import { colors } from '../../constants/colors';
const ChooseLang = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [nativeLang, setNativeLang] = useState('tr');

  const user = useSelector((state) => state.userAuth.user);
  console.log(user);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.lottieContainer}></View>

      <View style={{ paddingTop: 280 }}>
        <View style={styles.nativeLang}>
          <DropDownPicker
            items={[
              { label: 'Turkish', value: 'tr' },
              { label: 'Deutsch', value: 'de' },
              { label: 'French', value: 'fr' },
            ]}
            defaultIndex={0}
            containerStyle={{ height: 40 }}
            onChangeItem={(item) => {
              setNativeLang(item.value);
            }}
          />
        </View>
        <View style={styles.currentLang}>
          <DropDownPicker
            items={[
              { label: 'English', value: 'en' },
              { label: 'Deutsch', value: 'de' },
              { label: 'French', value: 'fr' },
            ]}
            defaultIndex={0}
            containerStyle={{ height: 40 }}
            onChangeItem={(item) => {
              setCurrentLang(item.value);
            }}
          />
        </View>
      </View>

      <SignButton
        title={'Devam Et'}
        color={colors.sign_button}
        onPress={() => {
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

export default ChooseLang;

const styles = StyleSheet.create({
  lottieContainer: {},
  currentLang: { paddingTop: 40, margin: 10 },
  nativeLang: { paddingTop: 20, margin: 10 },
});

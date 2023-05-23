import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { i18n } from '../../../constants/langSupport';
import DropDownPicker from 'react-native-dropdown-picker';
const NativeLangDrop = ({ setNativeLang }) => {
  const [defaultDropdown, setDefaultDropdown] = useState(true);

  return (
    <View style={styles.nativeLang}>
      <Text style={{ marginTop: 10 }}>{i18n.t('nativeLang')}</Text>
      <View style={{ marginBottom: 140 }}>
        <DropDownPicker
          defaultNull={defaultDropdown}
          placeholder={i18n.t('selectLang')}
          items={[
            { label: '🇹🇷' + 'Turkish', value: 'tr' },
            { label: '🇬🇧' + 'English', value: 'gb' },
            { label: '🇩🇪' + 'Deutsch', value: 'de' },
            { label: '🇫🇷' + 'Franch', value: 'fr' },
            { label: '🇪🇸' + 'Spanish', value: 'es' },
            { label: '🇨🇳' + 'Chinese', value: 'zh-cht' },
            { label: '🇦🇪' + 'Arabic', value: 'ar' },
          ]}
          defaultIndex={0}
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => {
            setNativeLang(item.value);
            setDefaultDropdown(false);
          }}
        />
      </View>
    </View>
  );
};

export default NativeLangDrop;

const styles = StyleSheet.create({
  currentLang: { paddingTop: 40 },
  nativeLang: { paddingTop: 20, margin: 10 },
});

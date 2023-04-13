import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { i18n } from '../../../constants/langSupport';
import DropDownPicker from 'react-native-dropdown-picker';
const CurrentLangDrop = ({ setCurrentLang }) => {
  const [defaultDropdown, setDefaultDropdown] = useState(true);
  const [selectedLang, setSelectedLang] = useState('');
  return (
    <View style={styles.nativeLang}>
      <Text style={{ marginTop: 10 }}>{i18n.t('currentLang')}</Text>
      <View style={{ marginBottom: 120 }}>
        <DropDownPicker
          defaultNull={defaultDropdown}
          placeholder={i18n.t('selectLang')}
          items={[
            { label: '🇹🇷' + ' Turkish', value: 'tr' },
            { label: '🇹🇷' + 'Deutsch', value: 'de' },
            { label: 'French', value: 'fr' },
          ]}
          defaultIndex={0}
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => {
            setCurrentLang(item.value);
            setDefaultDropdown(false);
          }}
        />
      </View>
    </View>
  );
};

export default CurrentLangDrop;

const styles = StyleSheet.create({});

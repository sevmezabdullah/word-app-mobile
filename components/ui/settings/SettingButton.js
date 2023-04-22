import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingButton = ({ onPress, title, icon }) => {
  return (
    <View>
      <TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.appButtonText}>{title}</Text>
          <MaterialCommunityIcons name={icon} size={24} color={'black'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    alignSelf: 'flex-start',
  },
});

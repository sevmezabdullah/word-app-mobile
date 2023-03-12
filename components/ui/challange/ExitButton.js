import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ExitButton = ({ navigation }) => {
  return (
    <View style={styles.exitButtonContainer}>
      <View style={styles.exitButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tabs');
          }}
        >
          <MaterialCommunityIcons name="close" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  exitButton: {
    elevation: 8,
  },

  exitButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 46,
    marginEnd: 15,
  },
});

import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

const SocialButton = ({ icon, navigateFun }) => {
  return (
    <TouchableOpacity onPress={navigateFun}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: icon,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
});

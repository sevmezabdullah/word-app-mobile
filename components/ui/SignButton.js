import { StyleSheet, Text, Pressable, View } from 'react-native';
import React from 'react';

const SignButton = ({ title, icon, color, size, onPress }) => {
  const pressStyle = [styles.button, { backgroundColor: color }];
  return (
    <Pressable
      style={({ pressed }) => [
        pressStyle,
        pressed ? { opacity: 0.5 } : pressStyle,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        {icon}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SignButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderColor: 'black',
    marginHorizontal: 30,
    borderWidth: 1,
    marginVertical: 10,
    elevation: 5,
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 10,

    letterSpacing: 0.25,
    color: 'white',
  },
});

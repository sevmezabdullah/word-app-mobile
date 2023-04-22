import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import React from 'react';

const ForgetPasswordText = ({ navigation }) => {
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => {
        fadeIn();
      }}
      onPressOut={fadeOut}
    >
      <View style={{ marginVertical: 10 }}>
        <Animated.View
          style={{
            opacity: animated,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              color: 'white',
              fontSize: 16,
              marginEnd: 8,
              fontStyle: 'italic',
              textDecorationLine: 'underline',
            }}
          >
            Şifremi unuttum ?{' '}
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default ForgetPasswordText;

const styles = StyleSheet.create({});

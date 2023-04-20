import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const Background = ({ component }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4c669f" />
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
        {component}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

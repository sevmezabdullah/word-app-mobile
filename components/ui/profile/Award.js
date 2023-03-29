import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Award = ({ award }) => {
  return (
    <View style={styles.container}>
      <Text>Award</Text>
    </View>
  );
};

export default Award;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
});

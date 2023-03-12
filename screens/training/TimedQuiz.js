import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExitButton from '../../components/ui/challange/ExitButton';

const TimedQuiz = ({ navigation }) => {
  return (
    <View>
      <ExitButton navigation={navigation} />
    </View>
  );
};

export default TimedQuiz;

const styles = StyleSheet.create({});

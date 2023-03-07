import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect } from 'react';

const QuizTraining = ({ navigation, route }) => {
  const difficulty = route.params.difficulty;
  useEffect(() => {
    console.log(difficulty);
  }, []);
  return (
    <View>
      <Text>QuizTraining</Text>
    </View>
  );
};

export default QuizTraining;

const styles = StyleSheet.create({});

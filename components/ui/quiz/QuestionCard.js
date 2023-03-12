import React from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';

//import Card
import { Card } from 'react-native-paper';
const QuestionCard = ({ question }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <Card
          style={{ width: '100%', height: 150, borderRadius: 15, padding: 10 }}
        >
          <Text style={styles.paragraph}>{question}</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  questionContainer: {
    height: '50%',
    width: '100%',
    padding: 10,
  },
  paragraph: {
    fontSize: 18,
    margin: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
});

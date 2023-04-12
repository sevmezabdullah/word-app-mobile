import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { Card } from 'react-native-paper';
import { useEffect } from 'react';
import { useState } from 'react';

const Award = ({ award, awardUser }) => {
  const [progressBar, setProgressBar] = useState(null);

  useEffect(() => {
    checkProgressBar(award.id);
  }, [awardUser]);

  const calculateOpacity = (id, progress) => {
    setProgressBar(
      <Progress.Bar
        width={100}
        height={10}
        color="orange"
        progress={progress}
      />
    );
  };
  const checkProgressBar = (id) => {
    if (awardUser !== null) {
      if (id === 0) {
        const progress = awardUser.knownWordCount / 100;
        calculateOpacity(0, progress);
      } else if (id === 1) {
        const progress = awardUser.knownWordCount / 400;
        calculateOpacity(1, progress);
      } else if (id === 2) {
        const progress = awardUser.knownWordCount / 800;
        calculateOpacity(2, progress);
      } else if (id === 3) {
        const progress = awardUser.quizResultsCount / 15;
        calculateOpacity(3, progress);
      } else if (id === 4) {
        const progress = awardUser.quizResultsCount / 30;
        calculateOpacity(4, progress);
      } else if (id === 5) {
        const progress = awardUser.quizResultsCount / 60;
        calculateOpacity(5, progress);
        calculateOpacity(5, progress);
      } else if (id === 6) {
        const progress = awardUser.totalCorrectAnswer / 300;
        calculateOpacity(6, progress);
      } else if (id === 7) {
        const progress = awardUser.totalCorrectAnswer / 600;
        calculateOpacity(7, progress);
      } else if (id === 8) {
        const progress = awardUser.totalCorrectAnswer / 900;
        calculateOpacity(8, progress);
      } else if (id === 9) {
        const progress = awardUser.nonWrongQuiz / 15;
        calculateOpacity(9, progress);
      } else if (id === 10) {
        const progress = awardUser.nonWrongQuiz / 30;
        calculateOpacity(10, progress);
      } else if (id === 11) {
        const progress = awardUser.nonWrongQuiz / 45;
        calculateOpacity(11, progress);
      }
    }
  };

  return (
    <Card style={{ width: '31%', margin: 4 }}>
      <View style={styles.container}>
        <Image
          style={{ width: '70%', height: 50, opacity: 0.5 }}
          source={award.image}
        />
        <Text>{award.title}</Text>
        <Text style={{ fontSize: 10 }}>{award.detail}</Text>
        {progressBar}
      </View>
    </Card>
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

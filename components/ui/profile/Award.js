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
  }, []);

  const checkProgressBar = (id) => {
    if (id === 0) {
      const progress = awardUser.knownWordCount / 100;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 1) {
      const progress = awardUser.knownWordCount / 400;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 2) {
      const progress = awardUser.knownWordCount / 800;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 3) {
      const progress = awardUser.quizResultsCount / 15;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 4) {
      const progress = awardUser.quizResultsCount / 30;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 5) {
      const progress = awardUser.quizResultsCount / 60;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 6) {
      const progress = awardUser.totalCorrectAnswer / 300;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 7) {
      const progress = awardUser.totalCorrectAnswer / 600;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 8) {
      const progress = awardUser.totalCorrectAnswer / 900;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 9) {
      const progress = awardUser.nonWrongQuiz / 15;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 10) {
      const progress = awardUser.nonWrongQuiz / 30;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    } else if (id === 11) {
      const progress = awardUser.nonWrongQuiz / 45;
      setProgressBar(
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      );
    }
  };
  return (
    <Card style={{ width: '33%' }}>
      <View style={styles.container}>
        <Image style={{ width: '80%', height: 80 }} source={award.image} />
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

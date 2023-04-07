import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import ChallengeButton from '../../components/ui/challange/ChallengeButton';
import { colors } from '../../constants/colors';
import QuizImage from '../../assets/quiz.png';
import AgainstTime from '../../assets/time.png';
import { Dialog } from 'react-native-paper';
import { useState } from 'react';

import { i18n } from '../../constants/langSupport';

const QUIZ_IMAGE = Image.resolveAssetSource(QuizImage).uri;
const AGAINST_TIME = Image.resolveAssetSource(AgainstTime).uri;

const Challenge = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState(false);

  const closeDifDialog = () => {
    setDifficulty(false);
  };
  const gotoQuiz = (difficulty) => {
    setDifficulty(false);
    if (quizType === 'classic')
      navigation.navigate('Quiz', { difficulty: difficulty });

    if (quizType === 'timed')
      navigation.navigate('TimedQuiz', { difficulty: difficulty });
  };
  const [quizType, setQuizType] = useState('classic');
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
        }}
      >
        <ChallengeButton
          onPress={() => {
            setQuizType('classic');
            setDifficulty(true);
          }}
          title={i18n.t('quizButtonText')}
          icon={QUIZ_IMAGE}
        />
        <ChallengeButton
          title={i18n.t('challangeAgainstTime')}
          onPress={() => {
            setQuizType('timed');
            setDifficulty(true);
          }}
          icon={AGAINST_TIME}
        />
      </View>
      <Dialog visible={difficulty}>
        <Dialog.Title>{i18n.t('chooseDiffculty')}</Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 5 }}>
            <Button
              onPress={() => {
                gotoQuiz('kolay');
              }}
              color={'green'}
              title={i18n.t('easyQuiz')}
            />
          </View>

          <View style={{ marginBottom: 5 }}>
            <Button
              onPress={() => {
                gotoQuiz('orta');
              }}
              color={'orange'}
              title={i18n.t('mediumQuiz')}
            />
          </View>

          <Button
            onPress={() => {
              gotoQuiz('zor');
            }}
            color={'red'}
            title={i18n.t('hardQuiz')}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={'purple'}
            onPress={closeDifDialog}
            title={i18n.t('close')}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: colors.background,
    flex: 1,
  },
  item: {},
});

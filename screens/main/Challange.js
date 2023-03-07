import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import ChallengeButton from '../../components/ui/challange/ChallengeButton';
import { colors } from '../../constants/colors';
import QuizImage from '../../assets/quiz.png';
import AgainstTime from '../../assets/time.png';
import { Dialog } from 'react-native-paper';
import { useState } from 'react';

const QUIZ_IMAGE = Image.resolveAssetSource(QuizImage).uri;
const AGAINST_TIME = Image.resolveAssetSource(AgainstTime).uri;

const Challenge = ({ navigation }) => {
  const [difficulty, setDifficulty] = useState(false);
  const closeDifDialog = () => {
    setDifficulty(false);
  };
  const gotoQuiz = (difficulty) => {
    navigation.navigate('Quiz', { difficulty: difficulty });
  };
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
            setDifficulty(true);
          }}
          title="Quiz"
          icon={QUIZ_IMAGE}
        />
        <ChallengeButton title="Zamana Karşı" icon={AGAINST_TIME} />
      </View>
      <Dialog visible={difficulty}>
        <Dialog.Title>Zorluk Seçimi</Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 5 }}>
            <Button
              onPress={() => {
                gotoQuiz('easy');
              }}
              color={'green'}
              title="Kolay"
            />
          </View>

          <View style={{ marginBottom: 5 }}>
            <Button
              onPress={() => {
                gotoQuiz('medium');
              }}
              color={'orange'}
              title="Orta"
            />
          </View>

          <Button
            onPress={() => {
              gotoQuiz('hard');
            }}
            color={'red'}
            title="Zor"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={'purple'} onPress={closeDifDialog} title="Kapat" />
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

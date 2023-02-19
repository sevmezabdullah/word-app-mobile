import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import ChallengeButton from '../../components/ui/challange/ChallengeButton';
import { colors } from '../../constants/colors';
import QuizImage from '../../assets/quiz.png';
import BotImage from '../../assets/against_bot.png';

const QUIZ_IMAGE = Image.resolveAssetSource(QuizImage).uri;
const BOT_IMAGE = Image.resolveAssetSource(BotImage).uri;

const Challange = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
        }}
      >
        <ChallengeButton title="Quiz" icon={QUIZ_IMAGE} />
        <ChallengeButton title="Botlara Karşı" icon={BOT_IMAGE} />
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}
      >
        <ChallengeButton
          title="Rakiplere Karşı"
          icon="../../../assets/quiz.png"
        />
        <ChallengeButton
          title="Kelime Tanıma"
          icon="../../../assets/quiz.png"
        />
      </View>
    </View>
  );
};

export default Challange;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: colors.background,
    flex: 1,
  },
  item: {},
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import ExitButton from '../../components/ui/challange/ExitButton';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById } from '../../redux/slices/quizSlice';
import { resetArr } from '../../redux/slices/wordSlice';
import QuestionCard from '../../components/ui/quiz/QuestionCard';
import CardButton from '@paraboly/react-native-card-button';
import { ActivityIndicator } from 'react-native-paper';
import Dialog from 'react-native-dialog';

const passQuestionDuration = 1000;

const QuizTraining = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { quizId } = route.params || null;
  const quiz = useSelector((state) => state.quiz.quiz);
  const status = useSelector((state) => state.quiz.status);
  const [exit, setExit] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerable, setAnswerable] = useState(true);
  const [answerColor, setAnswerColor] = useState({
    answerA: 'white',
    answerB: 'white',
    answerC: 'white',
    answerD: 'white',
  });

  const [sound, setSound] = useState();
  useEffect(() => {
    if (quizId !== null) {
      dispatch(getQuizById(quizId));
    }

    dispatch(resetArr());
  }, [dispatch]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/success.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  async function playWrongSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/wrong.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  const nextQuestion = () => {
    let increaseIndex = questionIndex;
    increaseIndex++;

    if (increaseIndex < quiz.questions.length - 1) {
      setQuestionIndex(increaseIndex);
    } else if (increaseIndex === quiz.questions.length - 1) {
      console.log('Quiz tamamlandı');
    }
    clearAnswer();
    setAnswerable(true);
  };

  const checkAnswer = (userAnswer, buttonType) => {
    if (userAnswer === quiz.questions[questionIndex].answerCorrect) {
      playSound();
      if (buttonType === 'A') {
        setAnswerColor({ answerA: 'green' });
      }
      if (buttonType === 'B') {
        setAnswerColor({ answerB: 'green' });
      }

      if (buttonType === 'C') {
        setAnswerColor({ answerC: 'green' });
      }

      if (buttonType === 'D') {
        setAnswerColor({ answerD: 'green' });
      }
    }
    if (userAnswer !== quiz.questions[questionIndex].answerCorrect) {
      playWrongSound();

      if (buttonType === 'A') {
        setAnswerColor({ answerA: 'red' });
      }
      if (buttonType === 'B') {
        setAnswerColor({ answerB: 'red' });
      }

      if (buttonType === 'C') {
        setAnswerColor({ answerC: 'red' });
      }

      if (buttonType === 'D') {
        setAnswerColor({ answerD: 'red' });
      }
    }
  };

  const clearAnswer = () => {
    setAnswerColor({
      answerA: 'white',
      answerB: 'white',
      answerC: 'white',
      answerD: 'white',
    });
  };
  if (status === 'fulfilled') {
    return (
      <View style={styles.container}>
        <ExitButton navigation={navigation} setExit={setExit} />
        <QuestionCard question={quiz.questions[questionIndex].question} />
        <View style={styles.answers}>
          <View style={[styles.answerButton]}>
            <CardButton
              onPress={
                answerable
                  ? () => {
                      setAnswerable(false);
                      checkAnswer(quiz.questions[questionIndex].answerA, 'A');
                      setTimeout(nextQuestion, passQuestionDuration);
                    }
                  : null
              }
              text={quiz.questions[questionIndex].answerA}
              textColor={
                answerColor.answerA === 'green' || answerColor.answerA === 'red'
                  ? 'white'
                  : 'black'
              }
              backgroundColor={answerColor.answerA}
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={
                answerable
                  ? () => {
                      setAnswerable(false);
                      checkAnswer(quiz.questions[questionIndex].answerB, 'B');
                      setTimeout(nextQuestion, passQuestionDuration);
                    }
                  : null
              }
              text={
                quiz.questions[questionIndex].answerB ||
                answerColor.answerB === 'red'
              }
              textColor={
                answerColor.answerB === 'green' || answerColor.answerB === 'red'
                  ? 'white'
                  : 'black'
              }
              textSize={18}
              backgroundColor={answerColor.answerB}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={
                answerable
                  ? () => {
                      setAnswerable(false);
                      checkAnswer(quiz.questions[questionIndex].answerC, 'C');
                      setTimeout(nextQuestion, passQuestionDuration);
                    }
                  : null
              }
              backgroundColor={answerColor.answerC}
              text={quiz.questions[questionIndex].answerC}
              textColor={
                answerColor.answerC === 'green' || answerColor.answerC === 'red'
                  ? 'white'
                  : 'black'
              }
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={
                answerable
                  ? () => {
                      setAnswerable(false);
                      checkAnswer(quiz.questions[questionIndex].answerD, 'D');
                      setTimeout(nextQuestion, passQuestionDuration);
                    }
                  : null
              }
              text={quiz.questions[questionIndex].answerD}
              textColor={
                answerColor.answerD === 'green' || answerColor.answerD === 'red'
                  ? 'white'
                  : 'black'
              }
              textSize={18}
              backgroundColor={answerColor.answerD}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
        </View>

        <Dialog.Container visible={exit}>
          <Dialog.Title>Çıkış</Dialog.Title>
          <Dialog.Description>
            Çıkış yapılırsa gelişim kaydedilmeyecektir. Emin misin?
          </Dialog.Description>

          <Dialog.Button
            onPress={() => {
              setExit(false);
            }}
            label="Vazgeç"
          />
          <Dialog.Button
            onPress={() => {
              navigation.navigate('Tabs');
            }}
            label="Çıkış Yap"
          />
        </Dialog.Container>
      </View>
    );
  } else if (status === 'idle') {
    return <ActivityIndicator />;
  }
};

export default QuizTraining;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  answerButton: {
    paddingEnd: 30,
    marginTop: 10,
  },
  answers: {},
});

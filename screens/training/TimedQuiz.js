import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExitButton from '../../components/ui/challange/ExitButton';
import { useState } from 'react';
import Dialog from 'react-native-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { resetArr } from '../../redux/slices/wordSlice';
import {
  getQuizByDifficulty,
  increaseCorrect,
  increaseWrong,
  addCorrectAnswer,
  addUserAnswer,
  addQuestion,
} from '../../redux/slices/quizSlice';
import QuestionCard from '../../components/ui/quiz/QuestionCard';
import CardButton from '@paraboly/react-native-card-button';
const passQuestionDuration = 1000;
const TimedQuiz = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [exit, setExit] = useState(false);
  const [time, setTime] = useState(20);
  const { difficulty } = route.params;
  const user = useSelector((state) => state.userAuth.user);
  const quiz = useSelector((state) => state.quiz.quiz);
  const status = useSelector((state) => state.quiz.status);
  const [sound, setSound] = useState();
  const incrementTime = (count) => {
    setTime((time) => time + count);
  };
  const decrementTime = (count) => {
    setTime((time) => time - count);
  };
  useEffect(() => {
    if (difficulty === 'kolay') {
      setTime(30);
    } else if (difficulty === 'orta') {
      setTime(25);
    } else if (difficulty === 'zor') {
      setTime(20);
    }
  }, [difficulty]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerable, setAnswerable] = useState(true);
  const [answerColor, setAnswerColor] = useState({
    answerA: 'white',
    answerB: 'white',
    answerC: 'white',
    answerD: 'white',
  });

  const nextQuestion = () => {
    let increaseIndex = questionIndex;
    increaseIndex++;

    if (increaseIndex < quiz.questions.length) {
      setQuestionIndex(increaseIndex);
    } else if (increaseIndex === quiz.questions.length) {
      navigateToResult();
    }
    clearAnswer();
    setAnswerable(true);
  };

  const navigateToResult = () => {
    navigation.navigate('Result');
  };

  const clearAnswer = () => {
    setAnswerColor({
      answerA: 'white',
      answerB: 'white',
      answerC: 'white',
      answerD: 'white',
    });
  };

  const checkAnswer = (userAnswer, buttonType) => {
    dispatch(addCorrectAnswer(quiz.questions[questionIndex].answerCorrect));
    dispatch(addUserAnswer(userAnswer));
    dispatch(addQuestion(quiz.questions[questionIndex].question));
    if (userAnswer === quiz.questions[questionIndex].answerCorrect) {
      dispatch(increaseCorrect());

      playSound();

      if (difficulty === 'kolay') {
        incrementTime(7);
      }
      if (difficulty === 'orta') {
        incrementTime(4);
      }
      if (difficulty === 'zor') {
        incrementTime(3);
      }
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
      dispatch(increaseWrong());
      playWrongSound();
      if (difficulty === 'kolay') {
        decrementTime(7);
      }
      if (difficulty === 'orta') {
        decrementTime(4);
      }
      if (difficulty === 'zor') {
        decrementTime(3);
      }
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

  useEffect(() => {
    if (difficulty !== null || difficulty !== undefined)
      dispatch(
        getQuizByDifficulty({
          difficulty: difficulty,
          currentLang: user.currentLang,
        })
      );
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
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/success.wav')
    );
    setSound(sound);

    await sound.playAsync();
  }
  async function playWrongSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/wrong.wav')
    );
    setSound(sound);

    await sound.playAsync();
  }

  if (status === 'fulfilled') {
    if (quiz !== null) {
      return (
        <View>
          <ExitButton setExit={setExit} navigation={navigation} />
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CountdownCircleTimer
              isPlaying
              duration={time}
              onComplete={navigateToResult}
              size={90}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
          </View>

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
                  answerColor.answerA === 'green' ||
                  answerColor.answerA === 'red'
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
                  answerColor.answerB === 'green' ||
                  answerColor.answerB === 'red'
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
                  answerColor.answerC === 'green' ||
                  answerColor.answerC === 'red'
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
                  answerColor.answerD === 'green' ||
                  answerColor.answerD === 'red'
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
              <Text style={{ color: 'black' }}>
                Çıkış yapılırsa gelişim kaydedilmeyecektir. Emin misin?
              </Text>
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
    }
  }
};
//
export default TimedQuiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  answerButton: {
    marginTop: 10,
    marginEnd: 20,
  },
  answers: {
    marginEnd: 10,

    marginTop: '-30%',
    paddingEnd: 20,
  },
});

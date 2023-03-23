import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Audio } from 'expo-av';
import ExitButton from '../../components/ui/challange/ExitButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuizById,
  getQuizByDifficulty,
  increaseCorrect,
  increaseWrong,
} from '../../redux/slices/quizSlice';
import { resetArr } from '../../redux/slices/wordSlice';
import QuestionCard from '../../components/ui/quiz/QuestionCard';
import CardButton from '@paraboly/react-native-card-button';
import { ActivityIndicator } from 'react-native-paper';
import Dialog from 'react-native-dialog';
import {
  addAwardtoUser as addAwardUser,
  addWordUser,
} from '../../redux/slices/authSlice';

const passQuestionDuration = 1000;

const QuizTraining = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { quizId, card, category, knownWords, difficulty } =
    route.params || null;
  const user = useSelector((state) => state.userAuth.user);
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
  const [isCompletedQuiz, setIsCompletedQuiz] = useState(false);

  const [sound, setSound] = useState();

  useEffect(() => {
    if (quizId === undefined) {
      if (difficulty !== null || difficulty !== undefined) {
        dispatch(
          getQuizByDifficulty({
            difficulty: difficulty,
            currentLang: user.currentLang,
          })
        );
      }
    } else if (quizId !== null || quizId != undefined) {
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
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + '-' + month + '-' + year; //format: d-m-y;
  };
  const learnWord = () => {
    if (card.length === knownWords.length) {
      dispatch(
        addAwardUser({
          awardId: category.awardId,
          userId: user.id,
        })
      );
    }

    knownWords.forEach((word) => {
      dispatch(
        addWordUser({
          knownWords: { word, date: getCurrentDate() },
          id: user.id,
        })
      );
    });
  };
  const nextQuestion = () => {
    let increaseIndex = questionIndex;
    increaseIndex++;

    if (increaseIndex < quiz.questions.length) {
      setQuestionIndex(increaseIndex);
    } else if (increaseIndex === quiz.questions.length) {
      if (quizId) {
        navigateToResult();
      }
    }
    clearAnswer();
    setAnswerable(true);
  };

  const navigateToResult = () => {
    learnWord();
    navigation.navigate('Result', {
      correctCount: 0,
      wrongCount: 0,
    });
  };

  const checkAnswer = (userAnswer, buttonType) => {
    if (userAnswer === quiz.questions[questionIndex].answerCorrect) {
      dispatch(increaseCorrect());
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
      dispatch(increaseWrong());
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
        <Dialog.Container visible={isCompletedQuiz}>
          <Dialog.Title>Quiz Tamamlandı</Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <Dialog.Button
            label="Anasayfaya Dön"
            onPress={() => {
              navigation.navigate('Tabs');
            }}
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
    backgroundColor: '#DBE4EB',
    height: '100%',
  },
  answerButton: {
    marginTop: 10,
    marginEnd: 20,
  },
  answers: {
    marginEnd: 40,
    paddingEnd: 20,
  },
});

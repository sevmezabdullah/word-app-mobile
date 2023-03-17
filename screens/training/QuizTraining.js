import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';

import ExitButton from '../../components/ui/challange/ExitButton';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById } from '../../redux/slices/quizSlice';
import { resetArr } from '../../redux/slices/wordSlice';
import QuestionCard from '../../components/ui/quiz/QuestionCard';
import CardButton from '@paraboly/react-native-card-button';
import { ActivityIndicator } from 'react-native-paper';
import Dialog from 'react-native-dialog';
const QuizTraining = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { quizId } = route.params || null;
  const quiz = useSelector((state) => state.quiz.quiz);
  const status = useSelector((state) => state.quiz.status);
  const [exit, setExit] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    if (quizId !== null) {
      dispatch(getQuizById(quizId));
    }

    dispatch(resetArr());
  }, [dispatch]);

  const nextQuestion = () => {
    let increaseIndex = questionIndex;
    increaseIndex++;
    if (increaseIndex < quiz.questions.length - 1) {
      setQuestionIndex(increaseIndex);
    } else if (increaseIndex === quiz.questions.length - 1) {
      console.log('Quiz tamamlandı');
    }
  };
  if (status === 'fulfilled') {
    return (
      <View style={styles.container}>
        <ExitButton navigation={navigation} setExit={setExit} />
        <QuestionCard question={quiz.questions[questionIndex].question} />
        <View style={styles.answers}>
          <View style={styles.answerButton}>
            <CardButton
              onPress={() => {
                nextQuestion();
              }}
              text={quiz.questions[questionIndex].answerA}
              textColor="black"
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={() => {
                nextQuestion();
              }}
              text={quiz.questions[questionIndex].answerB}
              textColor="black"
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={() => {
                nextQuestion();
              }}
              text={quiz.questions[questionIndex].answerC}
              textColor="black"
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              onPress={() => {
                nextQuestion();
              }}
              text={quiz.questions[questionIndex].answerD}
              textColor="black"
              textSize={18}
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

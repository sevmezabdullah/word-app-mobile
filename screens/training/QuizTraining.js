import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useEffect } from 'react';

import ExitButton from '../../components/ui/challange/ExitButton';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizById } from '../../redux/slices/quizSlice';
import { resetArr } from '../../redux/slices/wordSlice';
import QuestionCard from '../../components/ui/quiz/QuestionCard';
import CardButton from '@paraboly/react-native-card-button';

const QuizTraining = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.quiz.status);
  const difficulty = route.params.difficulty || null;
  const quizId = route.params.quizId || null;

  let quiz = [];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerColor, setAnswerColor] = useState('#E21818');
  const [questions, setQuestions] = useState([]);
  const incrementQuestionIndex = () => {
    /*     if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex(questionIndex++);
 
    } */
    setAnswerColor('#E21818');
  };

  if (quizId != null) {
    quiz = useSelector((state) => state.quiz.quiz);
  }
  useEffect(() => {
    if (quizId !== null && quizId !== undefined) {
      dispatch(getQuizById(quizId));
      if (quiz.questions !== null && status === 'fulfilled') {
        setQuestions(quiz.questions);
      }
    }
    dispatch(resetArr());
  }, [dispatch]);

  const checkAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer === correctAnswer) {
      setAnswerColor('#BE6DB7');
    }
  };

  if (questions.length > 0 && questions !== null && questions !== undefined) {
    return (
      <View style={styles.container}>
        <ExitButton navigation={navigation} />
        <QuestionCard question={questions[questionIndex].question} />
        <View style={styles.answers}>
          <View style={styles.answerButton}>
            <CardButton
              onPress={() => {
                checkAnswer('data', 'data');
                /*     incrementQuestionIndex(); */
                console.log('Cevap gönderildi');
              }}
              text={questions[questionIndex].answerA}
              textColor="black"
              rippleColor={answerColor}
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
          <View style={styles.answerButton}>
            <CardButton
              text={questions[questionIndex].answerB}
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
              text={'Answer'}
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
              text={questions[questionIndex].answerC}
              textColor="black"
              textSize={18}
              iconComponent={<View></View>}
              width={400}
              height={60}
              gradient={false}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return <View></View>;
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

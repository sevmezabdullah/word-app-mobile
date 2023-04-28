import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExitButton from '../../components/ui/challange/ExitButton';
import { useState } from 'react';
import Dialog from 'react-native-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { getQuizByDifficulty } from '../../redux/slices/quizSlice';
const TimedQuiz = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [exit, setExit] = useState(false);
  const [time, setTime] = useState(20);
  const { difficulty } = route.params;
  const user = useSelector((state) => state.userAuth.user);
  const quiz = useSelector((state) => state.quiz.quiz);
  const inrementTime = () => {
    setTime((time) => time + 5);
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

  useEffect(() => {
    dispatch(
      getQuizByDifficulty({
        difficulty: difficulty,
        currentLang: user.currentLang,
      })
    );
  }, [dispatch]);
  return (
    <View>
      <ExitButton setExit={setExit} navigation={navigation} />
      <View style={styles.container}>
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
            size={90}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => <Text>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </View>
        //
        <Button title="+" />
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
};
//
export default TimedQuiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

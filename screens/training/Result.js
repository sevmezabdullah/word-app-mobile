import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DataTable, IconButton, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '../../redux/slices/quizSlice';
import { useState } from 'react';
import { completeQuiz, incrementExp } from '../../redux/slices/authSlice';
import { getUserDeck } from '../../redux/slices/authSlice';
const Result = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const correctCount = useSelector((state) => state.quiz.correctCount);
  const wrongCount = useSelector((state) => state.quiz.wrongCount);
  const userAnswers = useSelector((state) => state.quiz.userAnswers);
  const questions = useSelector((state) => state.quiz.questions);
  const currentCorrectAnswers = useSelector(
    (state) => state.quiz.currentCorrectAnswers
  );
  const quiz = useSelector((state) => state.quiz.quiz);
  const user = useSelector((state) => state.userAuth.user);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [detailDialog, setDetailDialog] = useState(false);

  const complete = () => {
    dispatch(
      completeQuiz({
        quizId: quiz._id,
        userId: user.id,
        result: {
          correctCount: correctCount,
          wrongCount: wrongCount,
          currentCorrectAnswers: currentCorrectAnswers,
          userAnswers: userAnswers,
        },
      })
    );

    dispatch(incrementExp({ userId: user.id, exp: quiz.exp }));
    dispatch(getUserDeck({ userId: user.id })).unwrap();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Sonuç</Text>
      </View>

      <View style={styles.resultContainer}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>Doğru Cevap</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text>{correctCount}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>Yanlış Cevap</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text>{wrongCount}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>Toplam</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text>{wrongCount + correctCount}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>Kazanılan Exp</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text>{quiz.exp}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      <View style={styles.detailResultContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text>Sıra</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Cevabınız</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Doğru Cevap</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text>Soruyu Gör</Text>
            </DataTable.Title>
          </DataTable.Header>

          {userAnswers.map((item, index) => {
            return (
              <DataTable.Row
                style={{
                  opacity: 0.8,
                  backgroundColor:
                    item === currentCorrectAnswers[index] ? 'green' : 'red',
                  margin: 1,
                  borderRadius: 7,
                }}
                key={index}
              >
                <DataTable.Cell>
                  <Text style={styles.resultText}>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.resultText}>{item}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.resultText}>
                    {currentCorrectAnswers[index]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    onPress={() => {
                      console.log(
                        '🚀 ~ file: Result.js:124 ~ {userAnswers.map ~ questions[index]:',
                        questions[index]
                      );
                      setCurrentQuestion(questions[index]);
                      setDetailDialog(true);
                    }}
                    icon={'eye'}
                    iconColor="white"
                    size={24}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
      <View
        style={{
          marginTop: 10,
          width: '90%',

          alignSelf: 'center',
        }}
      >
        <Button
          onPress={() => {
            complete();
            navigation.navigate('Tabs');
            dispatch(initialize());
          }}
          title="Tamamla"
        />
      </View>
      <Dialog visible={detailDialog}>
        <Dialog.Title>Soru</Dialog.Title>
        <Dialog.Content>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth }}>
            <Text>{currentQuestion}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setDetailDialog(false);
            }}
            title="Kapat"
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flex: 1,
  },
  dataTitle: {
    fontSize: 16,
    color: 'white',
  },
  correctRow: {
    height: '50%',
    justifyContent: 'center',
    borderTopEndRadius: 7,
    borderTopStartRadius: 7,
    backgroundColor: '#4B80A6',
  },
  total: {
    height: '50%',
    borderTopWidth: 2,
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    justifyContent: 'center',
    backgroundColor: '#4B80A6',
  },

  wrongRow: {
    height: '50%',
    borderTopWidth: 2,

    justifyContent: 'center',
    backgroundColor: '#4B80A6',
  },

  resultContainer: {
    marginTop: 10,
    height: '25%',
    width: '90%',
    borderRadius: 7,
    flexDirection: 'column',
    borderWidth: 1,
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 26,
    flexDirection: 'row',
    alignContent: 'center',
  },
  title: {
    width: '90%',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    backgroundColor: '#4B80A6',
    height: 43,
    alignSelf: 'center',
    borderRadius: 7,
    elevation: 5,
  },
  textTitle: {
    color: 'white',
    fontSize: 18,
  },
  detailResultContainer: {
    marginTop: '1%',
    width: '90%',
    borderWidth: 1,

    height: '55%',
    elevation: 0,
    borderRadius: 7,
    alignSelf: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 16,
  },
});

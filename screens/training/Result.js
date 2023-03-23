import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '../../redux/slices/quizSlice';

const Result = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const correctCount = useSelector((state) => state.quiz.correctCount);
  const wrongCount = useSelector((state) => state.quiz.wrongCount);
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
              <Text>45</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      {/*       <View style={styles.resultContainer}>
        <View style={styles.correctRow}>
          <View style={styles.row}>
            <Text style={styles.dataTitle}>Doğru</Text>
            <Text style={styles.dataTitle}>15</Text>
          </View>
        </View>
        <View style={styles.wrongRow}>
          <View style={styles.row}>
            <Text style={styles.dataTitle}>Yanlış</Text>
            <Text style={styles.dataTitle}>15</Text>
          </View>
        </View>
        <View style={styles.total}>
          <View style={styles.row}>
            <Text style={styles.dataTitle}>Toplam</Text>
            <Text style={styles.dataTitle}>30</Text>
          </View>
        </View>
      </View> */}
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
          </DataTable.Header>
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
            navigation.navigate('Tabs');
            dispatch(initialize());
          }}
          title="Tamamla"
        ></Button>
      </View>
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
});

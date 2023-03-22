import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';

const Result = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Sonuç</Text>
      </View>
      <View style={styles.resultContainer}>
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
      </View>
      <View style={styles.detailResultContainer}></View>
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
    marginTop: 20,
    height: '15%',
    width: '90%',
    borderRadius: 7,
    flexDirection: 'column',
    elevation: 16,
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
    marginTop: '20%',
    width: '90%',
    borderWidth: 1,
    height: '60%',
    elevation: 16,
    borderRadius: 7,
    alignSelf: 'center',
  },
});

import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatItem from './StatItem';

const Stat = ({ data }) => {
  const result = data.result;
  const statRows = [
    { item: 'Tamamlanan Quiz', value: result.completedQuizCount },
    { item: 'Toplam Öğrenilen Kelime', value: result.knownWordCount },
    { item: 'Doğru Cevaplar', value: result.correctAnswerCount },
    { item: 'Yanlış Cevaplar', value: result.wrongAnswerCount },
    { item: 'Günlük Kelime', value: 0 },
    { item: 'Haftalık Kelime', value: 0 },
    { item: 'Aylık Kelime', value: 0 },
    { item: 'Yıllık  Kelime', value: 0 },
  ];
  return (
    <View
      style={{
        height: 300,
        marginTop: '5%',
        marginRight: '5%',
        marginLeft: '5%',
        marginBottom: '30%',
        borderRadius: 32,
        backgroundColor: 'white',
      }}
    >
      <FlatList
        data={statRows}
        renderItem={({ item }) => <StatItem item={item} />}
      />
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({});

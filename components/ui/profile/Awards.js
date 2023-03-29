import { FlatList, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Award from './Award';

const awards = [
  { image: '', title: '', detail: '' },
  'item 1',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
  'item 2',
];

const Awards = () => {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        data={awards}
        renderItem={({ item }) => <Award award={item} />}
      />
    </View>
  );
};

export default Awards;

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginTop: '5%',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: '30%',
    borderRadius: 32,
    backgroundColor: 'white',
  },
});

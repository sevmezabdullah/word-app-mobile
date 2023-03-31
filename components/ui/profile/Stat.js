import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatItem from './StatItem';

const statRows = [{ item: '' }, { item: '' }, { item: '' }, { item: '' }];
const Stat = ({ data }) => {
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
      <FlatList data={statRows} renderItem={({ item }) => <StatItem />} />
    </View>
  );
};

export default Stat;

const styles = StyleSheet.create({});

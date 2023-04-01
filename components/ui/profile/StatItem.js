import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';

const StatItem = ({ item }) => {
  return (
    <Card style={{ height: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ margin: 10 }}>
          <Text>{item.item}</Text>
        </View>
        <View style={{ marginRight: '10%', marginTop: '3%' }}>
          <Text>{item.value}</Text>
        </View>
      </View>
    </Card>
  );
};

export default StatItem;

const styles = StyleSheet.create({});

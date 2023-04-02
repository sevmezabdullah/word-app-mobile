import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';

const StatItem = ({ item }) => {
  return (
    <Card style={{ height: 50, margin: 10, borderRadius: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ margin: 10, marginTop: '7%' }}>
          <Text style={{ textAlignVertical: 'bottom' }}>{item.item}</Text>
        </View>
        <View style={{ marginRight: '10%', marginTop: '7%' }}>
          <Text>{item.value}</Text>
        </View>
      </View>
    </Card>
  );
};

export default StatItem;

const styles = StyleSheet.create({});

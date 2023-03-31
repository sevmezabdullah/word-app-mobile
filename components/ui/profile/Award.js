import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { Card } from 'react-native-paper';

const Award = ({ award, progress }) => {
  return (
    <Card style={{ width: '33%' }}>
      <View style={styles.container}>
        <Image style={{ width: '80%', height: 80 }} source={award.image} />
        <Text>{award.title}</Text>
        <Text style={{ fontSize: 10 }}>{award.detail}</Text>
        <Progress.Bar
          width={100}
          height={10}
          color="orange"
          progress={progress}
        />
      </View>
    </Card>
  );
};

export default Award;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,

    alignItems: 'center',
  },
});

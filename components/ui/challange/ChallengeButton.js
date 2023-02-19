import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';

const ChallengeButton = ({ title, icon }) => {
  return (
    <View style={styles.buttonContainer}>
      <Card style={{ width: 150, height: 150 }}>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image style={{ width: 100, height: 100 }} source={{ uri: icon }} />
        </View>
        <Card.Content>
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ChallengeButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    width: 200,
  },
});

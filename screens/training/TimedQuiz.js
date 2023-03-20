import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExitButton from '../../components/ui/challange/ExitButton';
import { useState } from 'react';
import Dialog from 'react-native-dialog';
import ProgressBar from '../../components/ui/challange/ProgressBar';

const TimedQuiz = ({ navigation }) => {
  const [exit, setExit] = useState(false);
  const [count, setCount] = useState(60);
  return (
    <View>
      <ExitButton setExit={setExit} navigation={navigation} />
      <View style={styles.container}>
        <ProgressBar setCount={setCount} count={count} defaultMin={60} />
      </View>

      <Dialog.Container visible={exit}>
        <Dialog.Title>Çıkış</Dialog.Title>
        <Dialog.Description>
          Çıkış yapılırsa gelişim kaydedilmeyecektir. Emin misin?
        </Dialog.Description>

        <Dialog.Button
          onPress={() => {
            setExit(false);
          }}
          label="Vazgeç"
        />
        <Dialog.Button
          onPress={() => {
            navigation.navigate('Tabs');
          }}
          label="Çıkış Yap"
        />
      </Dialog.Container>
    </View>
  );
};

export default TimedQuiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

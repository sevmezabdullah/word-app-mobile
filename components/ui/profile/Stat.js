import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';
import StatItem from './StatItem';
import { useEffect } from 'react';
import { getUserStat } from '../../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from '../../../constants/langSupport';
const Stat = () => {
  const user = useSelector((state) => state.userAuth.user);
  const stat = useSelector((state) => state.userAuth.stat);
  const statRequest = useSelector((state) => state.userAuth.statRequest);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserStat({ userId: user.id }));
  }, [dispatch]);
  let statRows;
  if (stat != null && stat !== undefined) {
    const result = stat.result;
    if (result !== undefined) {
      const knownWords = i18n.t('knownWords');
      const completedQuiz = i18n.t('completedQuiz');
      const correctAnswers = i18n.t('correctAnswers');
      const wrongAnswers = i18n.t('wrongAnswers');
      statRows = [
        { item: knownWords, value: result.knownWordCount },
        { item: completedQuiz, value: result.completedQuizCount },

        { item: correctAnswers, value: result.correctAnswerCount },
        { item: wrongAnswers, value: result.wrongAnswerCount },
      ];
    }
  } else {
    statRows = [];
  }

  if (statRequest === 'pending' || statRequest === 'idle') {
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
        <ActivityIndicator size={50} style={{ justifyContent: 'center' }} />
      </View>
    );
  } else {
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
  }
};

export default Stat;

const styles = StyleSheet.create({});

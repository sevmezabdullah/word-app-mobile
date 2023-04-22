import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { i18n } from '../../constants/langSupport';
import { useSelector } from 'react-redux';
import ChooseLang from '../main/ChooseLang';
import TabNavigator from './tab-navigator';
import CardTraining from '../training/CardTraining';
import Settings from '../main/Settings';
import QuizTraining from '../training/QuizTraining';
import TimedQuiz from '../training/TimedQuiz';
import Result from '../training/Result';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.userAuth.user);

  if (user !== null) {
    if (user.currentLang === null || user.currentLang === '') {
      return <ChooseLang />;
    }
  }

  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={TabNavigator}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Result"
        component={Result}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CardTraining"
        component={CardTraining}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Quiz"
        component={QuizTraining}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="TimedQuiz"
        component={TimedQuiz}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: i18n.t('settings'),
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#3E4A66',
          },
        }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import ChooseLang from '../main/ChooseLang';
import TabNavigator from './tab-navigator';
import CardTraining from '../training/CardTraining';
import Settings from '../main/Settings';

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
        name="CardTraining"
        component={CardTraining}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTitle: 'Ayarlar' }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

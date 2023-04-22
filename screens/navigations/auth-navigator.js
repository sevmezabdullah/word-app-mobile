import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgetPassword from '../auth/ForgetPassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        name="ForgetPassword"
        options={{
          headerTitle: 'Şifremi Unuttum',
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#3E4A66',
          },
        }}
        component={ForgetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

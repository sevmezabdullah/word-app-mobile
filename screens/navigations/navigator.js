import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import { checkToken } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const AppRoute = () => {
  const token = useSelector((state) => state.userAuth.token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function verifyToken() {
      dispatch(checkToken());
    }
    ((async) => verifyToken())();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {token === null ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;

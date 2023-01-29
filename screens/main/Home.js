import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSignOut, logout } from '../../redux/slices/authSlice';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(logout());
      }}
    >
      <View>
        <Text style={{ textAlign: 'center' }}>Çıkış Yap</Text>
      </View>
    </Pressable>
  );
};

export default Home;

const styles = StyleSheet.create({});

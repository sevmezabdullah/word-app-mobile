import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
const Profile = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Profile</Text>
      <Pressable
        onPress={() => {
          dispatch(logout());
        }}
      >
        <View>
          <Text style={{ textAlign: 'center', marginTop: 100 }}>Çıkış Yap</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

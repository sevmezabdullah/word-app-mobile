import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-image-avatars';

const ChangeImageButton = ({ avatarLink }) => {
  return (
    <Avatar
      imageUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      size="small"
      text="Abdullah Sevmez"
      type="image"
      shape="square"
      borderColor="#f2f2f2"
      shadow
    />
  );
};

export default ChangeImageButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

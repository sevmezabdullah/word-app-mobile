import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById } from '../../redux/slices/categorySlice';
const CardTraining = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { categoryId } = route.params;
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategoryById(categoryId)).unwrap();
  }, [dispatch]);

  if (category !== null) {
    return (
      <View>
        <Text>{categoryId}</Text>
        <Text>{category.imageUri}</Text>
      </View>
    );
  }
};

export default CardTraining;

const styles = StyleSheet.create({});

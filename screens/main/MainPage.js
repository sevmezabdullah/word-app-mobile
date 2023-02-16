import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { getCategories } from '../../redux/slices/categorySlice';
import io from 'socket.io-client';
import LoginInput from '../../components/ui/auth/LoginInput';
import CategoryItem from '../../components/ui/home/CategoryItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const MainPage = () => {
  const categoryList = useSelector((state) => state.category.categories);
  const categoryStatus = useSelector((state) => state.category.status);
  const socket = io('http://192.168.1.115:3000');
  const dispatch = useDispatch();
  socket.on('online', (data) => {
    console.log('Online Kullanıcılar : ', data);
  });

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(getCategories()).unwrap();
    }
  }, [dispatch]);
  return (
    <View>
      <LoginInput placeHolder="Aramak istediğiniz kategoriyi girin" />
      <FlatList
        numColumns={3}
        style={{
          marginTop: 20,
          marginHorizontal: 4,
          display: 'flex',
          height: '87%',
        }}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        data={categoryList}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});

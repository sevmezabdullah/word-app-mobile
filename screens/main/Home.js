import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React from 'react';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/slices/categorySlice';
import io from 'socket.io-client';
import { colors } from '../../constants/colors';
import LoginInput from '../../components/ui/LoginInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from '../../components/ui/home/CategoryItem';
const Home = () => {
  const socket = io('http://192.168.1.115:3000');
  const dispatch = useDispatch();
  socket.on('online', (data) => {
    console.log('Online Kullanıcılar : ', data);
  });

  const categoryList = useSelector((state) => state.category.categories);
  const categoryStatus = useSelector((state) => state.category.status);

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(getCategories()).unwrap();
    }
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { socketURL } from '../../constants/uri';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../redux/slices/categorySlice';
import io from 'socket.io-client';
import { colors } from '../../constants/colors';
import LoginInput from '../../components/ui/auth/LoginInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from '../../components/ui/home/CategoryItem';

import { getUser } from '../../redux/slices/authSlice';

const Home = ({ navigation }) => {
  const socket = io(socketURL);
  const dispatch = useDispatch();

  socket.on('online', (data) => {
    console.log('Online Kullanıcılar : ', data);
  });

  const categoryList = useSelector((state) => state.category.categories);
  const categoryStatus = useSelector((state) => state.category.status);
  const user = useSelector((state) => state.userAuth.user);

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(getCategories()).unwrap();
    }
    if (user === null) {
      dispatch(getUser()).unwrap();
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
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('CardTraining');
              }}
            >
              <CategoryItem item={item} lang={user.nativeLang} />
            </Pressable>
          )}
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

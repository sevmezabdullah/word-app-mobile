import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { socketURL } from '../../constants/uri';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearch, getCategories } from '../../redux/slices/categorySlice';
import io from 'socket.io-client';
import { colors } from '../../constants/colors';

import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from '../../components/ui/home/CategoryItem';

import { getUser, getUserDeck } from '../../redux/slices/authSlice';

import { initialize } from '../../redux/slices/quizSlice';

import { I18n } from 'i18n-js';
import { en, tr, gb, ar } from '../../constants/localizations.json';
import { getLocales } from 'expo-localization';
const Home = ({ navigation }) => {
  const socket = io(socketURL);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.user);
  const categoryList = useSelector((state) => state.category.categories);
  const categoryStatus = useSelector((state) => state.category.status);

  const i18n = new I18n({ tr, en, ar, gb });
  const locale = getLocales();
  const lang = locale[0].languageCode;
  i18n.locale = lang;

  socket.on('online', (data) => {
    console.log('Online Kullanıcılar : ', data);
  });

  const fetchCategories = () => {
    if (categoryStatus === 'idle') {
      dispatch(getCategories()).unwrap();
    }
  };

  useEffect(() => {
    dispatch(initialize());

    if (user === null) {
      dispatch(getUser()).unwrap();
    }
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(getUserDeck({ userId: user.id })).unwrap();
      });
      return unsubscribe;
    }
  }, [dispatch]);

  navigation.addListener('focus', fetchCategories);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/*   <LoginInput
          value={searchCategory}
          inputHandler={handleSearchText}
          placeHolder="Aramak istediğiniz kategoriyi girin"
        /> */}
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
                navigation.navigate('CardTraining', {
                  categoryId: item._id,
                });
              }}
            >
              <CategoryItem item={item} lang={user.currentLang} />
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

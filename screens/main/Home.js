import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { socketURL } from '../../constants/uri';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoriesByLangCodes } from '../../redux/slices/categorySlice';
import io from 'socket.io-client';
import { colors } from '../../constants/colors';

import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from '../../components/ui/home/CategoryItem';

import {
  getUser,
  getUserDeck,
  getUserFromServer,
} from '../../redux/slices/authSlice';

import Background from '../../components/background/Background';

const Home = ({ navigation }) => {
  const socket = io(socketURL);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.user);

  const categoryList = useSelector((state) => state.category.categories);

  const categoryStatus = useSelector((state) => state.category.status);

  socket.on('online', (data) => {});
  useEffect(() => {
    navigation.addListener('focus', () => {
      if (user === null) {
      }
      dispatch(getUserFromServer());
      fetchCategories();
      dispatch(getUserDeck());
    });
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [user]);

  const fetchCategories = () => {
    if (user !== null) {
      dispatch(
        getCategoriesByLangCodes({
          nativeLang: user.nativeLang,
          currentLang: user.currentLang,
        })
      );
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getUserDeck());
    });
    if (user !== null) {
      const unsubscribe = navigation.addListener('focus', () => {});
      return unsubscribe;
    }
  }, []);

  return (
    <Background
      component={
        <View>
          <FlatList
            numColumns={3}
            style={styles.listContainer}
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
                {user !== null ? (
                  <CategoryItem item={item} lang={user.currentLang} />
                ) : (
                  <View></View>
                )}
              </Pressable>
            )}
          />
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    marginHorizontal: 4,
    display: 'flex',
    height: '98%',
  },
});

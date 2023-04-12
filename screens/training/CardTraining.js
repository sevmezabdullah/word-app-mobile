import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from 'react-native-dialog';
import {
  getCategoryById,
  getWordsByCategoryId,
} from '../../redux/slices/categorySlice';
import Swiper from 'react-native-deck-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addUnknownWord, resetArr } from '../../redux/slices/wordSlice';

import FlipCard from 'react-native-flip-card';
import { addKnownWords } from '../../redux/slices/quizSlice';

const CardTraining = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { categoryId } = route.params;
  const category = useSelector((state) => state.category.category);
  const card = useSelector((state) => state.category.words);
  const user = useSelector((state) => state.userAuth.user);
  const currentLang = user.currentLang;
  const nativeLang = user.nativeLang;
  const wordLoading = useSelector((state) => state.category.wordLoading);
  const [exit, setExit] = useState(false);

  const knownWords = useSelector((state) => state.quiz.knownWords);
  const unKnownWords = useSelector((state) => state.word.unKnownWords);
  const [swipingUnknown, setSwipingUnknown] = useState(20);
  const [swipingKnown, setSwipingKnown] = useState(20);

  const [finished, setFinished] = useState(false);
  useEffect(() => {
    dispatch(getCategoryById(categoryId)).unwrap();
    dispatch(getWordsByCategoryId(categoryId)).unwrap();
  }, [dispatch, categoryId]);

  /*   useEffect(() => {
    dispatch(getCategoryById(categoryId)).unwrap();
    dispatch(getWordsByCategoryId(categoryId)).unwrap();
  }, [categoryId]); */

  const addWord = (index, isRight) => {
    const cardId = card[index]._id;
    if (isRight) {
      dispatch(addKnownWords(cardId));
    } else {
      dispatch(addUnknownWord(cardId));
    }
    resetActions();
  };

  const resetActions = () => {
    setSwipingKnown(20);
    setSwipingUnknown(20);
  };

  if (category !== null && card.length > 0) {
    if (wordLoading === 'loading') {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            {/*     <Text>card words gelmiyor</Text> */}
          </View>
        </View>
      );
    } else if (wordLoading === 'fullfilled') {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.exitButton}>
            <TouchableOpacity
              onPress={() => {
                setExit(true);
              }}
            >
              <MaterialCommunityIcons size={36} name="exit-run" />
            </TouchableOpacity>
          </View>
          <View styles={styles.container}>
            <Swiper
              onSwiping={(data) => {
                setSwipingUnknown(data);
                if (data < 0) {
                  setSwipingUnknown(data * -1);
                } else {
                  setSwipingUnknown(0);
                  setSwipingKnown(data);
                }
              }}
              onSwipedAborted={resetActions}
              onSwipedRight={(index) => {
                addWord(index, true);
              }}
              onSwipedLeft={(index) => {
                addWord(index, false);
              }}
              onSwipedAll={() => {
                setFinished(true);
              }}
              swipeBackCard={false}
              verticalSwipe={false}
              showSecondCard={true}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              cards={card || []}
              stackSize={card.length || 0}
              renderCard={(card) => {
                let tWord = '';
                let tSentences = '';

                let nWord = '';
                let nSentences = '';

                card.words.forEach((item) => {
                  if (item.langCode === currentLang) {
                    tWord = item;
                  }
                  if (item.langCode === nativeLang) {
                    nWord = item;
                  }
                });

                card.sentences.forEach((item) => {
                  if (item.langCode === currentLang) {
                    tSentences = item;
                  }
                  if (item.langCode === nativeLang) {
                    nSentences = item;
                  }
                });

                return (
                  <>
                    <View>
                      <FlipCard
                        clickable={true}
                        perspective={500}
                        flipHorizontal={true}
                        friction={6}
                        flipVertical={false}
                      >
                        <View>
                          <View style={styles.card}>
                            <Text style={styles.text}>{tWord.meaning}</Text>
                            <Text style={styles.sentences}>
                              {tSentences.meaning}
                            </Text>
                          </View>
                        </View>

                        <View>
                          <View style={styles.card}>
                            <Text style={styles.text}>{nWord.meaning}</Text>
                            <Text style={styles.sentences}>
                              {nSentences.meaning}
                            </Text>
                          </View>
                        </View>
                      </FlipCard>
                    </View>
                  </>
                );
              }}
            ></Swiper>
            <View>
              <Dialog.Container visible={exit}>
                <Dialog.Title>Çıkış</Dialog.Title>
                <Dialog.Description>
                  Çıkış yapılırsa gelişim kaydedilmeyecektir. Emin misin?
                </Dialog.Description>

                <Dialog.Button
                  onPress={() => {
                    setExit(false);
                  }}
                  label="Vazgeç"
                />
                <Dialog.Button
                  onPress={() => {
                    navigation.navigate('Tabs');
                  }}
                  label="Çıkış Yap"
                />
              </Dialog.Container>
            </View>

            <View>
              <Dialog.Container visible={finished}>
                <Dialog.Title>Sonuç</Dialog.Title>
                <Dialog.Description>
                  {knownWords.length} kelime bilinenler destesine eklendi.
                </Dialog.Description>
                <Dialog.Description>
                  {unKnownWords.length} kelime bilinmeyenler destesine eklendi.
                </Dialog.Description>
                <Dialog.Button
                  onPress={() => {
                    navigation.navigate('Tabs');

                    dispatch(resetArr());
                  }}
                  label="Kapat"
                />
                <Dialog.Button
                  label="Quiz Tamamla"
                  onPress={() => {
                    navigation.navigate('Quiz', {
                      quizId: category.quizId,
                      card: card,

                      user: user,
                      category: category,
                    });
                  }}
                />
              </Dialog.Container>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.rowAction}>
              <View
                style={[
                  styles.unknownAction,
                  { opacity: swipingUnknown / 100 },
                ]}
              >
                <MaterialCommunityIcons
                  color={'red'}
                  size={72}
                  name="close-circle"
                />
              </View>
              <View
                style={[styles.knownAction, { opacity: swipingKnown / 100 }]}
              >
                <MaterialCommunityIcons
                  color={'green'}
                  size={72}
                  name="thumb-up"
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          {/*     <Text>card words gelmiyor</Text> */}
        </View>
      </View>
    );
  }
};

export default CardTraining;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  exitButton: {
    paddingTop: 45,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  card: {
    borderRadius: 8,
    borderWidth: 2,
    height: 400,
    borderColor: 'grey',
    justifyContent: 'center',
    backgroundColor: '#1E2D64',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
    backgroundColor: 'transparent',
  },
  sentences: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  unknownAction: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  knownAction: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  rowAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 80,
  },
});

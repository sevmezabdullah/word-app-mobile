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

  const [swipingUnknown, setSwipingUnknown] = useState(20);
  const [swipingKnown, setSwipingKnown] = useState(20);
  const [knownWords, setKnownWords] = useState([]);
  const unknownWords = [];
  const wordArr = [];
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    dispatch(getCategoryById(categoryId)).unwrap();
    dispatch(getWordsByCategoryId(categoryId)).unwrap();
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getCategoryById(categoryId)).unwrap();
    dispatch(getWordsByCategoryId(categoryId)).unwrap();
  }, [categoryId]);

  const resetActions = () => {
    setSwipingKnown(20);

    setSwipingUnknown(20);
  };
  if (category !== null && card.length > 0) {
    if (wordLoading === 'loading') {
      return (
        <View>
          <Text>Yükleniyor</Text>
        </View>
      );
    }
    if (wordLoading === 'fullfilled') {
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
                  setKnownWords(0);
                  setSwipingUnknown(data * -1);
                } else {
                  setSwipingUnknown(0);
                  setSwipingKnown(data);
                }
              }}
              onSwipedAborted={() => {
                resetActions();
              }}
              onTapCard={() => {}}
              onSwipedRight={(index) => {
                const cardId = card[index]._id;
                wordArr.push(cardId);
                resetActions();
              }}
              onSwipedLeft={(index) => {
                resetActions();
              }}
              onSwipedAll={() => {
                setKnownWords(wordArr);
                setFinished(true);
              }}
              swipeBackCard={true}
              verticalSwipe={false}
              infinite={true}
              showSecondCard={true}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              cards={card || []}
              stackSize={card.length || 0}
              renderCard={(card) => {
                let tWord = null;
                let tSentences = null;

                card.words.forEach((item) => {
                  if (item.langCode === currentLang) {
                    tWord = item;
                  }
                });
                card.sentences.forEach((item) => {
                  if (item.langCode === currentLang) {
                    tSentences = item;
                  }
                });

                return (
                  <>
                    <View>
                      <View style={styles.card}>
                        <Text style={styles.text}>{tWord.meaning}</Text>
                        <Text style={styles.sentences}>
                          {tSentences.meaning}
                        </Text>
                      </View>
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
                  {unknownWords.length} kelime bilinmeyenler destesine eklendi.
                </Dialog.Description>
                <Dialog.Button
                  onPress={() => {
                    navigation.navigate('Tabs');
                  }}
                  label="Kapat"
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

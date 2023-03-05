import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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

  const [exit, setExit] = useState(false);

  const [knownWords, setKnownWords] = useState([]);
  const unknownWords = [];
  const wordArr = [];
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    console.log('Yeniden çalıştı');
    dispatch(getCategoryById(categoryId));
    dispatch(getWordsByCategoryId(categoryId));
    console.log('Use effect card', card);
  }, [dispatch, categoryId]);

  if (category !== null) {
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
            onTapCard={() => {}}
            onSwipedRight={(index) => {
              console.log('Saga atıldı.', card[index]._id);
              const cardId = card[index]._id;
              wordArr.push(cardId);
            }}
            onSwipedLeft={(index) => {
              console.log('Sola atıldı.', card[index]._id);
            }}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              setKnownWords(wordArr);
              setFinished(true);
            }}
            swipeBackCard={true}
            verticalSwipe={false}
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
                      <Text style={styles.sentences}>{tSentences.meaning}</Text>
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
      </View>
    );
  } else {
    return (
      <View>
        <Text>card words gelmiyor</Text>
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
});

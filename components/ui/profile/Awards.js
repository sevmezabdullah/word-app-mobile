import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import Award from './Award';
import AwardImage from '../../../assets/awards/award.png';

const AWARD_IMAGE = Image.resolveAssetSource({ uri: AwardImage }).uri;
const awards = [
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '100 Kelime Öğren' },
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '400 Kelime Öğren' },
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '800 Kelime Öğren' },
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '15 Quiz Tamamla' },
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '30 Quiz Tamamla' },
  { image: AWARD_IMAGE, title: 'Usta Öğrenici', detail: '60 Quiz Tamamla' },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '300 Soruyu Doğru Cevapla',
  },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '600 Soruyu Doğru Cevapla',
  },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '900 Soruyu Doğru Cevapla',
  },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '15 Quizi Yanlış Cevaplamadan Tamamla',
  },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '30 Quizi Yanlış Cevaplamadan Tamamla',
  },
  {
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '45 Quizi Yanlış Cevaplamadan Tamamla',
  },
];

const Awards = () => {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        data={awards}
        renderItem={({ item }) => <Award award={item} progress={0.4} />}
      />
    </View>
  );
};

export default Awards;

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginTop: '5%',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: '30%',
    borderRadius: 16,
    backgroundColor: 'white',
  },
});

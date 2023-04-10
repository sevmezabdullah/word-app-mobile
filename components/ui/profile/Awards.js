import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import Award from './Award';
import AwardImage from '../../../assets/awards/award.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAwards, getUserStat } from '../../../redux/slices/authSlice';

const AWARD_IMAGE = Image.resolveAssetSource({ uri: AwardImage }).uri;
const awards = [
  {
    id: 0,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '100 Kelime Öğren',
  },
  {
    id: 1,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '400 Kelime Öğren',
  },
  {
    id: 2,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '800 Kelime Öğren',
  },
  {
    id: 3,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '15 Quiz Tamamla',
  },
  {
    id: 4,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '30 Quiz Tamamla',
  },
  {
    id: 5,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '60 Quiz Tamamla',
  },
  {
    id: 6,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '300 Soruyu Doğru Cevapla',
  },
  {
    id: 7,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '600 Soruyu Doğru Cevapla',
  },
  {
    id: 8,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '900 Soruyu Doğru Cevapla',
  },
  {
    id: 9,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '15 Quizi Yanlış Cevaplamadan Tamamla',
  },
  {
    id: 10,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '30 Quizi Yanlış Cevaplamadan Tamamla',
  },
  {
    id: 11,
    image: AWARD_IMAGE,
    title: 'Usta Öğrenici',
    detail: '45 Quizi Yanlış Cevaplamadan Tamamla',
  },
];

const Awards = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.user);
  const awardUser = useSelector((state) => state.userAuth.awards);
  useEffect(() => {
    dispatch(getUserAwards({ userId: user.id }));
    dispatch(getUserStat({ userId: user.id }));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        data={awards}
        renderItem={({ item }) => {
          return <Award award={item} awardUser={awardUser} />;
        }}
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

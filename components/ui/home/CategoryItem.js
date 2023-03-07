import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';
import Icon from '@expo/vector-icons/Entypo';
import Cards from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const CategoryItem = ({ item, lang }) => {
  const icon = <Icon name="trophy" color={'orange'} size={18} />;
  const cards = <Cards name="cards-outline" color={'black'} size={18} />;
  const user = useSelector((state) => state.userAuth.user);
  const [title, setTitle] = useState('');
  useEffect(() => {
    item.titles.forEach((titleP) => {
      if (titleP.langCode === user.currentLang) {
        setTitle(titleP.meaning);
      }
    });
  }, [item]);

  return (
    <View style={{ width: 130 }}>
      <Card
        style={{
          margin: 3,
          elevation: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card.Content>
          <Image
            style={{ width: 80, height: 80, borderRadius: 5 }}
            source={{
              uri: item.logo,
            }}
          />
          <Text style={{ textAlign: 'center' }}>{title}</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{
                opacity: user.categoryAwardsIds.includes(item.awardId)
                  ? 1
                  : 0.2,
              }}
            >
              {icon}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {cards}
              <Text>{item.words.length}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});

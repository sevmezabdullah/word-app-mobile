import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { Card, Text } from 'react-native-paper';
import Icon from '@expo/vector-icons/Entypo';
import Cards from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const CategoryItem = ({ item, lang }) => {
  const user = useSelector((state) => state.userAuth.user);
  const [titles, setTitles] = useState([]);
  const icon = <Icon name="trophy" color={'orange'} size={18} />;
  const cards = <Cards name="cards-outline" color={'black'} size={18} />;

  useEffect(() => {
    setTitles([]);
    item.titles.forEach((titleItem) => {
      if (titleItem.langCode === lang) {
        setTitles((current) => [...current, titleItem.meaning]);
      }
    });
  }, [item]);
  if (user.categoryAwardsIds !== undefined || user.categoryAwardsIds !== null)
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Image
              style={styles.image}
              source={{
                uri: item.logo,
              }}
            />
            <Text style={styles.title}>{titles[0]}</Text>

            <View style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    width: 130,
  },
  card: {
    margin: 3,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

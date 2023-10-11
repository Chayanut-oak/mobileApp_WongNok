import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const FoodList = () => {
  const [images, setImages] = useState([
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
  ]);


  const splitImagesIntoPairs = (images) => {
    const pairs = [];
    for (let i = 0; i < images.length; i += 2) {
      const pair = images.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  const imagePairs = splitImagesIntoPairs(images);

  return (
    <View style={styles.container}>
      {imagePairs.map((pair, pairIndex) => (
        <View key={pairIndex} style={styles.row}>
          {pair.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.item}>
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={item.mealImage}
                />
                <Text style={styles.title}>{item.mealName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',

  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'contain',
  },
  title: {
    color: "#D1D1D1",
  },
});

export default FoodList;
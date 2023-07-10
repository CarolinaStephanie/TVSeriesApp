import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {seriesService} from '../services/api';
import {ISerie} from '../services/types';
import colors from '../themes/colors';

import {SeriesListScreenNavigationProp} from './types';

const SeriesListScreen = () => {
  const [seriesData, setSeriesData] = useState<ISerie[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const navigation = useNavigation<SeriesListScreenNavigationProp>();

  const getSeriesData = useCallback(async () => {
    const seriesData = await seriesService().loadSeries(pageIndex);
    setSeriesData(seriesData);
  }, [pageIndex]);

  const loadMoreData = () => setPageIndex(pageIndex + 1);

  const goToSerieDetail = (item: ISerie) => {
    navigation.navigate('SerieDetail', {serieData: item});
  };

  useEffect(() => {
    getSeriesData();
  }, [getSeriesData]);

  const renderItem = ({item}: {item: ISerie}) => {
    return (
      <TouchableOpacity onPress={() => goToSerieDetail(item)}>
        <View style={styles.item}>
          <View>
            <Image
              source={{uri: item?.image?.medium}}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.ratingText}>{item.rating?.average}</Text>
            <Text style={styles.genresText}>{`Genres: ${item.genres.join(
              ', ',
            )}.`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seriesData}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default SeriesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  item: {
    paddingVertical: 15,
    margin: 15,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  ratingText: {
    color: colors.black,
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    height: 130,
    width: 130,
  },
  textView: {
    flex: 1,
  },
  genresText: {
    paddingTop: 10,
    color: colors.secondaryText,
  },
});

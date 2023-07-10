import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {seriesService} from '../services/api';
import {ISerie} from '../services/types';
import colors from '../themes/colors';

import {SeriesListScreenNavigationProp} from './types';

const SeriesListScreen = () => {
  const [seriesData, setSeriesData] = useState<ISerie[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation<SeriesListScreenNavigationProp>();

  const getSeriesData = useCallback(
    async (isAllSearch: boolean) => {
      const seriesData = await seriesService().loadSeries(
        isAllSearch ? 1 : pageIndex,
      );
      setSeriesData(seriesData);
    },
    [pageIndex],
  );

  const searchSeriesData = useCallback(async () => {
    const seriesData = await seriesService().searchSeries(searchValue);
    setSeriesData(seriesData);
  }, [searchValue]);

  const loadMoreData = () => setPageIndex(pageIndex + 1);

  const goToSerieDetail = (item: ISerie) => {
    navigation.navigate('SerieDetail', {serieData: item});
  };

  const showAllSeries = () => {
    setSearchValue('');
    getSeriesData(true);
  };

  useEffect(() => {
    getSeriesData(false);
  }, []);

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
            <Text style={styles.genresText}>{`Genres: ${item.genres?.join(
              ', ',
            )}.`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <TouchableOpacity onPress={searchSeriesData}>
          <Text style={styles.searchText}>search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showAllSeries}>
        <View style={styles.showAllContent}>
          <Text style={styles.showAllText}>Show all!</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={seriesData}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <View style={styles.emptyListContent}>
            <Text>No series found!</Text>
          </View>
        }
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    margin: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  searchText: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  emptyListContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  showAllContent: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  showAllText: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.primary,
    fontSize: 12,
    color: colors.secondaryText,
  },
});

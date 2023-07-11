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
import {colors, fontSizes, normalize, spacing} from '../themes/themes';

import {SeriesListScreenNavigationProp} from './types';
import {commonStyles} from './commonStyles';

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
          <View style={styles.flexView}>
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
    <View style={[commonStyles.mainContainer, styles.flexView]}>
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
  flexView: {
    flex: 1,
  },
  item: {
    paddingVertical: spacing.medium,
    margin: spacing.medium,
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: spacing.default,
      height: spacing.default,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.8,
    elevation: 5,
  },
  title: {
    fontSize: fontSizes.xl,
    color: colors.primary,
    fontWeight: 'bold',
  },
  ratingText: {
    color: colors.black,
    fontSize: fontSizes.m,
    fontWeight: 'bold',
  },
  image: {
    height: normalize(130),
    width: normalize(130),
  },
  genresText: {
    paddingTop: spacing.default,
    color: colors.secondaryText,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: normalize(50),
    margin: spacing.large,
    paddingHorizontal: spacing.large,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.l,
  },
  searchText: {
    fontSize: fontSizes.xs,
    color: colors.secondaryText,
  },
  emptyListContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.large,
  },
  showAllContent: {
    paddingBottom: spacing.default,
    alignItems: 'center',
  },
  showAllText: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.primary,
    fontSize: fontSizes.xs,
    color: colors.secondaryText,
  },
});

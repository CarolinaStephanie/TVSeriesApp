import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import RenderHtml from 'react-native-render-html';
import {colors, fontSizes, normalize, spacing} from '../themes/themes';
import {seriesService} from '../services/api';
import {IEpisode, ISeason} from '../services/types';
import {commonStyles} from './commonStyles';

const SerieDetailScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'SerieDetail'>) => {
  const {serieData} = route.params;
  const [episodesListBySeason, setEpisodesListBySeason] = useState<ISeason>({});

  const getEpisodes = useCallback(async () => {
    const seriesEpisodes = await seriesService().loadSerieEpisodes(
      serieData.id,
    );
    const episodesBySeason: ISeason = {};
    seriesEpisodes.forEach(episode => {
      const seasonNumber = episode.season;
      if (!episodesBySeason.hasOwnProperty(seasonNumber)) {
        episodesBySeason[seasonNumber] = [];
      }
      episodesBySeason[seasonNumber].push(episode);
    });
    setEpisodesListBySeason(episodesBySeason);
  }, []);

  useEffect(() => {
    getEpisodes();
  }, [getEpisodes]);

  const goToEpisodeDetails = (episode: IEpisode) =>
    navigation.navigate('EpisodeDetail', {episodeData: episode});

  return (
    <ScrollView style={commonStyles.mainContainer}>
      <View>
        <Image
          source={{uri: serieData.image?.original}}
          resizeMode="cover"
          style={commonStyles.imageBanner}
        />
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={commonStyles.titleStyle}>{serieData.name}</Text>
        <Text style={styles.ratingText}>{serieData.rating?.average}</Text>
      </View>
      <Text
        style={commonStyles.descriptionText}>{`Genres: ${serieData.genres?.join(
        ', ',
      )}.`}</Text>
      <Text style={commonStyles.descriptionText}>
        {`Every ${serieData.schedule.days?.join(', ')} at ${
          serieData.schedule.time
        }.`}
      </Text>
      <RenderHtml
        tagsStyles={{p: commonStyles.pStyle}}
        source={{html: serieData.summary}}
      />

      {Object.entries(episodesListBySeason).map(([seasonNumber, episodes]) => (
        <View key={`season-${seasonNumber}`} style={styles.episodeList}>
          <Text style={styles.seasonText}>{`Season ${seasonNumber}:`}</Text>
          {episodes.map((episode: IEpisode) => (
            <TouchableOpacity onPress={() => goToEpisodeDetails(episode)}>
              <Text
                key={`season-${seasonNumber}-${episode.id}`}
                style={styles.episodeText}>
                {episode.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default SerieDetailScreen;

const styles = StyleSheet.create({
  titleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSizes.xxl,
  },
  episodeList: {
    padding: spacing.default,
  },
  seasonText: {
    fontSize: fontSizes.xl,
    color: colors.primary,
    fontWeight: 'bold',
  },
  episodeText: {
    paddingHorizontal: spacing.default,
    paddingVertical: fontSizes.m,
    fontSize: fontSizes.m,
    color: colors.secondaryText,
  },
});

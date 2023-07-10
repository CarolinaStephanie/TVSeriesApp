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
import colors from '../themes/colors';
import {seriesService} from '../services/api';
import {IEpisode, ISeason} from '../services/types';

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
    <ScrollView style={styles.scrollViewStyle}>
      <View>
        <Image
          source={{uri: serieData.image?.original}}
          resizeMode="cover"
          style={styles.imageBanner}
        />
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleStyle}>{serieData.name}</Text>
        <Text style={styles.ratingText}>{serieData.rating?.average}</Text>
      </View>
      <Text style={styles.descriptionText}>{`Genres: ${serieData.genres.join(
        ', ',
      )}.`}</Text>
      <Text style={styles.descriptionText}>
        {`Every ${serieData.schedule.days.join(', ')} at ${
          serieData.schedule.time
        }.`}
      </Text>
      <RenderHtml
        tagsStyles={{p: styles.pStyle}}
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
  scrollViewStyle: {
    backgroundColor: colors.secondary,
  },
  imageBanner: {
    width: '100%',
    height: 200,
  },
  titleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    padding: 10,
    fontSize: 25,
    color: colors.primary,
    fontWeight: 'bold',
  },
  descriptionText: {
    padding: 10,
  },
  ratingText: {
    fontSize: 25,
  },
  pStyle: {textAlign: 'justify', padding: 10},
  episodeList: {
    padding: 10,
  },
  seasonText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  episodeText: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 15,
    color: colors.secondaryText,
  },
});

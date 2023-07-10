import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import colors from '../themes/colors';
import RenderHtml from 'react-native-render-html';

const EpisodeDetailScreen = ({
  route,
}: StackScreenProps<RootStackParamList, 'EpisodeDetail'>) => {
  const {episodeData} = route.params;

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View>
        <Image
          source={{uri: episodeData.image.original}}
          resizeMode="cover"
          style={styles.imageBanner}
        />
        <Text style={styles.titleStyle}>{episodeData.name}</Text>
        <Text
          style={
            styles.descriptionText
          }>{`Season:${episodeData.season} - Episode: ${episodeData.number}`}</Text>
      </View>
      <RenderHtml
        tagsStyles={{p: styles.pStyle}}
        source={{html: episodeData.summary}}
      />
    </ScrollView>
  );
};

export default EpisodeDetailScreen;

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: colors.secondary,
  },
  imageBanner: {
    width: '100%',
    height: 200,
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
  pStyle: {textAlign: 'justify', padding: 10},
});

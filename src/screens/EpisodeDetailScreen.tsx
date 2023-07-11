import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import RenderHtml from 'react-native-render-html';
import {commonStyles} from './commonStyles';

const EpisodeDetailScreen = ({
  route,
}: StackScreenProps<RootStackParamList, 'EpisodeDetail'>) => {
  const {episodeData} = route.params;

  return (
    <ScrollView style={commonStyles.mainContainer}>
      <View>
        <Image
          source={{uri: episodeData.image.original}}
          resizeMode="cover"
          style={commonStyles.imageBanner}
        />
        <Text style={commonStyles.titleStyle}>{episodeData.name}</Text>
        <Text
          style={
            commonStyles.descriptionText
          }>{`Season:${episodeData.season} - Episode: ${episodeData.number}`}</Text>
      </View>
      <RenderHtml
        tagsStyles={{p: commonStyles.pStyle}}
        source={{html: episodeData.summary}}
      />
    </ScrollView>
  );
};

export default EpisodeDetailScreen;

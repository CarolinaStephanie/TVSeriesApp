import {IEpisode, ISerie} from '../services/types';

export type RootStackParamList = {
  TabNavigator: undefined;
  SerieDetail: {serieData: ISerie};
  EpisodeDetail: {episodeData: IEpisode};
};

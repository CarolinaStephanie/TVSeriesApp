import {IEpisode, ISerie} from '../services/types';

export type RootStackParamList = {
  SeriesListScreen: undefined;
  SerieDetail: {serieData: ISerie};
  EpisodeDetail: {episodeData: IEpisode};
};

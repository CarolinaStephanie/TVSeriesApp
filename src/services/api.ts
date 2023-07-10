import axios from 'axios';
import {ISerie, IEpisode} from './types';

axios.defaults.baseURL = 'https://api.tvmaze.com';

export interface SeriesService {
  loadSeries(pageIndex: number): Promise<ISerie[]>;
  loadSerieEpisodes(id: number): Promise<IEpisode[]>;
}

export const seriesService = (): SeriesService => {
  return {
    loadSeries: async (pageIndex: number) => {
      const response = await axios.get(`/shows?page=${pageIndex}`);
      return response.data;
    },
    loadSerieEpisodes: async (serieId: number) => {
      const response = await axios.get(`/shows/${serieId}/episodes`);
      return response.data;
    },
  };
};

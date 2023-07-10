import axios from 'axios';
import {ISearch, SeriesService} from './types';

axios.defaults.baseURL = 'https://api.tvmaze.com';

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
    searchSeries: async (title: string) => {
      const response = await axios.get(`/search/shows?q=${title}`);
      return response.data?.map?.(({show}: ISearch) => ({...show}));
    },
  };
};

type ImageType = {
  medium: string;
  original: string;
};

export interface ISerie {
  id: number;
  name: string;
  image: ImageType;
  genres: string[];
  summary: string;
  schedule: {
    days: string[];
    time: string;
  };
  rating: {
    average: number;
  };
}

export interface IEpisode {
  id: number;
  number: number;
  name: string;
  season: number;
  summary: string;
  image: ImageType;
}

export interface ISeason {
  [seasonNumber: number]: IEpisode[];
}

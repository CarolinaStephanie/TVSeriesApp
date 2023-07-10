import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {ISerie} from '../services/types';

export type SeriesListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SerieDetail'
>;

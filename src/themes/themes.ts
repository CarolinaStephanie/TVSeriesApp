import {Dimensions, PixelRatio} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const normalize = (size: number, forHeight = false) => {
  const scale = forHeight ? height / 812 : width / 375;
  return PixelRatio.roundToNearestPixel(size * scale);
};

export const colors = {
  primary: '#F08080',
  secondary: '#FFE4E1',
  primaryText: '#CCCCCC',
  secondaryText: '#808080',

  lightgray: '#DCDCDC',
  white: '#FFFFFF',
  black: '#000000',
};

export const fontSizes = {
  xs: normalize(12),
  s: normalize(14),
  m: normalize(16),
  l: normalize(18),
  xl: normalize(20),
  xxl: normalize(25),
};

export const spacing = {
  small: normalize(5),
  default: normalize(10),
  medium: normalize(15),
  large: normalize(20),
};

import {StyleSheet} from 'react-native';
import {colors, width, normalize, fontSizes, spacing} from '../themes/themes';

export const commonStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.secondary,
  },
  imageBanner: {
    width: width,
    height: normalize(200),
  },
  titleStyle: {
    padding: spacing.default,
    fontSize: fontSizes.xxl,
    color: colors.primary,
    fontWeight: 'bold',
  },
  descriptionText: {
    padding: spacing.default,
  },
  pStyle: {textAlign: 'justify', padding: spacing.default},
});

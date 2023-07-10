import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SeriesListScreen from '../screens/SeriesListScreen';
import SerieDetailScreen from '../screens/SerieDetailScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import {RootStackParamList} from './types';
import colors from '../themes/colors';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
        }}>
        <Stack.Screen
          name="SeriesListScreen"
          component={SeriesListScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="SerieDetail"
          component={SerieDetailScreen}
          options={{
            title: 'Details',
          }}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetailScreen}
          options={{
            title: 'Episode Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontSize: 20,
  },
  tabBarLabelStyle: {fontSize: 18},
});

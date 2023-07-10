import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SeriesListScreen from '../screens/SeriesListScreen';
import SerieDetailScreen from '../screens/SerieDetailScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import {RootStackParamList} from './types';
import colors from '../themes/colors';

const SearchScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Settings!</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabStyle,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.secondary,
      tabBarLabelStyle: styles.tabBarLabelStyle,
    }}>
    <Tab.Screen
      name="SeriesList"
      component={SeriesListScreen}
      options={{title: 'Series'}}
    />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            title: 'Home',
            headerStyle: styles.headerStyle,
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen
          name="SerieDetail"
          component={SerieDetailScreen}
          options={{
            title: 'Details',
            headerStyle: styles.headerStyle,
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetailScreen}
          options={{
            title: 'Episode Details',
            headerStyle: styles.headerStyle,
            headerTintColor: colors.white,
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

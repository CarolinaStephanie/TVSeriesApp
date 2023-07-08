import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from './navigation/RootNavigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <RootNavigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import RootNavigation from './navigation/RootNavigator';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;

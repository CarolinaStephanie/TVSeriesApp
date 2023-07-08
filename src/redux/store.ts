import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {reducer} from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};
const rootReducer = combineReducers({
  reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export default {store};

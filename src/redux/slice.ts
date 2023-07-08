import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favoriteIds: [],
};
const favoriteSlice = createSlice({
  name: 'userFavorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      return {...state, favoriteIds: action.payload};
    },
  },
});
export const {addFavorite} = favoriteSlice.actions;
export const reducer = favoriteSlice.reducer;

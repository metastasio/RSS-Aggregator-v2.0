import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
  name: 'input',
  initialState: {
    urls: [],
    posts: [],
  },
  reducers: {
    submitUrl(state, action) {
      console.log(action.payload.input.url, 'ACTION');

      state.urls.push({
        id: new Date().toISOString(),
        url: action.payload.input.url,
      });
    },
  },
});

export const { submitUrl } = inputSlice.actions;

export default inputSlice.reducer;

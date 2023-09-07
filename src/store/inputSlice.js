import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import aggregator from '../aggregator';

export const submitUrl = createAsyncThunk('input/submitUrl', function (url) {
  const response = aggregator(url);
  return response;
});

const inputSlice = createSlice({
  name: 'input',
  initialState: {
    urls: [],
    feed: [],
    feedback: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitUrl.fulfilled, (state, action) => {
      console.log(action.payload, 'ACTION');
      state.urls.push(action.payload.link);
      state.feed.push(action.payload);
      state.feedback = 'URL has been added';
    });
  },
});

// export const { submitUrl } = inputSlice.actions;

export default inputSlice.reducer;
// const inputSlice = createSlice({
//   name: 'input',
//   initialState: {
//     urls: [],
//     posts: [],
//     errors: [],
//   },
//   reducers: {
//     submitUrl(state, action) {
//       aggregator(action.payload.input.url).then((result) => {
//         if (result.message) {
//           state.errors.push(result.message);
//         } else {
//           state.urls.push({
//             id: new Date().toISOString(),
//             url: action.payload.input.url,
//           });
//           state.posts.push(result);
//         }
//       });
//     },
//   },
// });

import _ from 'lodash';
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
    posts: [],
    feedback: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitUrl.fulfilled, (state, action) => {
        const feedID = _.uniqueId();
        const { items, ...rest } = action.payload;
        const formattedFeedItem = {
          ...rest,
          id: feedID,
        };
        const formattedPostsFromFeed = items
          .map((item) => ({
            ...item,
            feedID,
            id: _.uniqueId(),
          }))
          .reverse();
        console.log(formattedPostsFromFeed, 'AAA');
        state.urls.push(action.payload.link);
        state.feed.push(formattedFeedItem);
        state.posts.push(...formattedPostsFromFeed);
        state.feedback = 'URL has been added';
      })
      .addCase(submitUrl.pending, (state) => {
        state.feedback = 'Loading';
      })
      .addCase(submitUrl.rejected, (state) => {
        state.feedback = 'Error';
      });
  },
});

export default inputSlice.reducer;

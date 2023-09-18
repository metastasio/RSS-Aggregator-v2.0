import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import aggregator from '../services/aggregator.js';

export const submitUrl = createAsyncThunk(
  'input/submitUrl',
  function (url, { dispatch }) {
    dispatch(setError(''));
    const resolvedRss = aggregator(url);
    return resolvedRss;
  },
);

export const updatePosts = createAsyncThunk(
  'input/updatePosts',
  async function (urls, { getState, dispatch }) {
    const { posts, feeds } = getState().input;
    try {
      const updatedPosts = urls.map((url) => {
        return aggregator(url).then((result) => {
          const getCorrectFeed = (element) => element.link === url;
          const correctFeed = feeds.find(getCorrectFeed);
          const filteredItems = _.differenceBy(result.items, posts, 'title');
          const newItems = filteredItems.map((item) => ({
            ...item,
            feedID: correctFeed.id,
            id: _.uniqueId(),
          }));
          return newItems;
        });
      });
      const resolvedPosts = await Promise.all(updatedPosts);
      const resolvedPostsFlat = resolvedPosts.flat();
      dispatch(updatePost(resolvedPostsFlat));
    } catch (error) {
      dispatch(setError(error.message));
    }
  },
);

const inputSlice = createSlice({
  name: 'input',
  initialState: {
    urls: [],
    feeds: [],
    posts: [],
    feedback: '',
    visitedLinks: [],
    preview: '',
    status: 'idle',
  },
  reducers: {
    updatePost(state, { payload }) {
      state.posts = [...payload, ...state.posts];
    },
    setError(state, action) {
      state.feedback = action.payload;
    },
    setVisited(state, action) {
      state.visitedLinks.push(action.payload);
    },
    removeFeed(state, action) {
      const urlToRemove = state.feeds.find(
        (feed) => feed.id === action.payload,
      );
      state.urls = state.urls.filter((url) => url !== urlToRemove.link);
      state.feeds = state.feeds.filter((feed) => feed.id !== action.payload);
      state.posts = state.posts.filter(
        (post) => post.feedID !== action.payload,
      );
      state.preview = '';
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },
  },
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
        state.urls.push(action.payload.link);
        state.feeds = [formattedFeedItem, ...state.feeds];
        state.posts = [...formattedPostsFromFeed, ...state.posts];

        state.feedback = 'URL was added';
        state.status = 'success';
      })
      .addCase(submitUrl.pending, (state) => {
        state.feedback = 'Loading';
        state.status = 'loading';
      })
      .addCase(submitUrl.rejected, (state, action) => {
        const { message } = action.error;
        state.feedback = message;
        state.status = 'error';
      });
  },
});

export const { setVisited, removeFeed, showPreview, setError, updatePost } =
  inputSlice.actions;

export default inputSlice.reducer;

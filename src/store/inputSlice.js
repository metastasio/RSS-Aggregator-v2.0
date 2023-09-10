import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import aggregator from '../aggregator';

export const submitUrl = createAsyncThunk('input/submitUrl', function (url) {
  const resolvedRss = aggregator(url);
  return resolvedRss;
});

export const updatePosts = createAsyncThunk(
  'input/updatePosts',
  async function (data, thunkAPI) {
    const { urls, feeds, posts } = data;
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
      thunkAPI.dispatch(inputSlice.actions.updatePost(resolvedPostsFlat));
    } catch (error) {
      thunkAPI.dispatch(
        inputSlice.actions.setError(
          `${error.message} - error.message from thunk refetch`,
        ),
      );
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
    popup: '',
  },
  reducers: {
    updatePost(state, { payload }) {
      state.posts.push(...payload);
    },
    setError(state, action) {
      state.feedback = action.payload;
    },
    setVisited(state, action) {
      state.visitedLinks.push(action.payload);
    },
    removeFeed(state, action) {
      state.feeds = state.feeds.filter((feed) => feed.id !== action.payload);
      state.posts = state.posts.filter(
        (post) => post.feedID !== action.payload,
      );
      state.popup = '';
    },
    openPopup(state, action) {
      state.popup = action.payload;
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
        state.feeds.push(formattedFeedItem);
        state.posts.push(...formattedPostsFromFeed);
        state.feedback = 'URL was added';
      })
      .addCase(submitUrl.pending, (state) => {
        state.feedback = 'Loading';
      })
      .addCase(submitUrl.rejected, (state) => {
        state.feedback = 'Error';
      });
  },
});

export const { setVisited, removeFeed, openPopup } = inputSlice.actions;

export default inputSlice.reducer;

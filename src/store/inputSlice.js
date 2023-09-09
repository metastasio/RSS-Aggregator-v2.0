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
    const { urls, feed, posts } = data;
    try {
      const updatedPosts = urls.map((url) => {
        return aggregator(url).then((result) => {
          const getCorrectFeed = (element) => element.link === url;
          const correctFeed = feed.find(getCorrectFeed);
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
    feed: [],
    posts: [],
    feedback: '',
    visitedLinks: [],
  },
  reducers: {
    updatePost(state, { payload }) {
      console.log(payload, 'PAYLOAD');
      state.posts.push(...payload);
    },
    setError(state, action) {
      state.feedback = action.payload;
    },
    setVisited(state, action) {
      state.visitedLinks.push(action.payload);
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

export const { setVisited } = inputSlice.actions;

export default inputSlice.reducer;

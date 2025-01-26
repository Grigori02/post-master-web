import  userReducer  from './reducers/userReducer';
import postsReducer  from './reducers/postsReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;
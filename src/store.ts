import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userApi from './services/auth.service';
import LoginSlice from './states/loginInfo';
import userSlice from './states/userState';
import topicApi from './services/topic.service';
import blogApi from './services/blog.service';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [LoginSlice.name]: LoginSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [topicApi.reducerPath]: topicApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, topicApi.middleware, blogApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
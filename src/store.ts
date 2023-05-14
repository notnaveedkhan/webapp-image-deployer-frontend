import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authApi from './services/auth.service';
import LoginSlice from './states/loginInfo';
import userSlice from './states/userState';
import topicApi from './services/topic.service';
import blogApi from './services/blog.service';
import topicSlice from './states/topics';
import userApi from './services/user.service';
import regionApi from "./services/region.service";
import clusterApi from "./services/cluster.service";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [LoginSlice.name]: LoginSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [topicApi.reducerPath]: topicApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [topicSlice.name]: topicSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [regionApi.reducerPath]: regionApi.reducer,
        [clusterApi.reducerPath]: clusterApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, topicApi.middleware, blogApi.middleware, userApi.middleware, regionApi.middleware,clusterApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
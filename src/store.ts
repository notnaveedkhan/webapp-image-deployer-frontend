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
import controlPlaneApi from "./services/controlPlane.service";
import nodeGroupService from "./services/nodeGroup.service";
import deploymentApi from './services/deploment.service';
import kubeServiceApi from './services/kubeService.service';
import notificationApi from './services/notification.service';
import commonApi from './services/common.service';
import verifyEmailSlice from './states/verify-email.state';
import otpApi from './services/otp.service';

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
        [controlPlaneApi.reducerPath]: controlPlaneApi.reducer,
        [nodeGroupService.reducerPath]: nodeGroupService.reducer,
        [deploymentApi.reducerPath]: deploymentApi.reducer,
        [kubeServiceApi.reducerPath]: kubeServiceApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [verifyEmailSlice.name]: verifyEmailSlice.reducer,
        [otpApi.reducerPath]: otpApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        topicApi.middleware,
        blogApi.middleware,
        userApi.middleware,
        regionApi.middleware,
        controlPlaneApi.middleware,
        nodeGroupService.middleware,
        deploymentApi.middleware,
        kubeServiceApi.middleware,
        notificationApi.middleware,
        commonApi.middleware,
        otpApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
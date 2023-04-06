import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userApi from './services/auth.service';
import LoginSlice from './states/loginInfo';
import userSlice from './states/userState';


export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [LoginSlice.name]: LoginSlice.reducer,
        [userSlice.name]: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
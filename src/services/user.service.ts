import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const userApi = createApi({
    reducerPath: "UserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASEURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { login: { token: string } }).login.token;
            if (token) {
                headers.set("Authorization", token);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/api/v1/auth/private/user/detail"
        })
    })
});


export const { useLazyGetUserQuery } = userApi;

export default userApi;
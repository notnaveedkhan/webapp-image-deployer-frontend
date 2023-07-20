import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Helper/baseQuery';


const userApi = createApi({
    reducerPath: "UserApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/api/v1/auth/private/user/detail"
        })
    })
});


export const { useLazyGetUserQuery } = userApi;

export default userApi;
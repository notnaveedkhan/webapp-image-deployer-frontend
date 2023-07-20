import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';

export interface LoginBody {
    email: string,
    password: string
}

const authApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginBody) => ({
                url: "/api/v1/auth/public/user/authenticate",
                body,
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "/api/v1/auth/public/user/create",
                body,
                method: "POST"
            })
        })
    })
});


export const { useLoginMutation, useRegisterMutation } = authApi;
export default authApi;

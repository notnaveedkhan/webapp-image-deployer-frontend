import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';
import { BasicResponse } from '../interfaces/BasicResponseType';

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
        }),
        forgotPassword: builder.mutation<BasicResponse, string>({
            query: (email: string) => ({
                url: `/api/v1/auth/public/user/forgot-password?email=${email}`,
                method: "PUT"
            })
        })
    })
});


export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation } = authApi;
export default authApi;

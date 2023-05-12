import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginBody {
    email: string,
    password: string
}

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASEURL,
        prepareHeaders: (headers) => {
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Origin", "http://waidk8.com:2000");
            headers.set("mode", "no-cors");
            return headers;

        }
    }),
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



export const { useLoginMutation, useRegisterMutation } = userApi;
export default userApi;

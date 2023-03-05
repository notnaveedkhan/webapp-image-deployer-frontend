import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginBody {
    email: string,
    password: string
}

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASEURL
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginBody) => ({
                url: "/api/public/user/authenticate",
                body,
                method: "POST"
            })
        })
    })
});



export const { useLoginMutation } = userApi;
export default userApi;
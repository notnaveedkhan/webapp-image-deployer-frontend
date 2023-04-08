import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface BlogBody {
    title: string,
    content: string,
    tags: string[]
}

const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASEURL
    }),
    endpoints: (builder) => ({

    })
});



export const { } = blogApi;
export default blogApi;

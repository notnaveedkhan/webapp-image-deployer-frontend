import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CreateBlogBody {
    title: string,
    content: string,
    topics: number[]
}

export interface DetailsBlogBody {
    page: number,
    size: number,
    topics: number[]
}


const blogApi = createApi({
    reducerPath: "blogApi",
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
    tagTypes: ['blogs'],
    endpoints: (builder) => ({
        getAllBlogs: builder.mutation({
            query: (body: DetailsBlogBody) => ({
                url: "/api/v1/auth/private/blogs/details",
                body,
                method: "POST"
            }),
            invalidatesTags: ['blogs']
        }),
        createBlog: builder.mutation({
            query: (body: CreateBlogBody) => ({
                url: "/api/v1/auth/private/blog/create",
                body,
                method: "POST"
            }),
            invalidatesTags: ['blogs']
        }),
        latestBlog: builder.query({
            query: () => ({
                url: "/api/v1/auth/private/latest/blogs/details",
                method: "GET"
            })
        })

    })
});



export const { useCreateBlogMutation, useGetAllBlogsMutation,useLatestBlogQuery } = blogApi;
export default blogApi;

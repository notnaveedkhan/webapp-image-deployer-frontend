import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';

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

export interface CreateCommentBody {
    blog: number | undefined,
    comment?: number,
    content: string
}


const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: baseQuery,
    tagTypes: ['blogs', 'comments'],
    endpoints: (builder) => ({
        getAllBlogs: builder.mutation<any, DetailsBlogBody>({
            query: (body) => ({
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
        }),

        findById: builder.query<any, string | undefined>({
            query: (id: string | undefined) => `/api/v1/auth/private/blog/${id}/detail`,
            providesTags: ['comments']
        }),

        createComment: builder.mutation<any[], any>({
            query: (body: any) => ({
                url: "/api/v1/auth/private/comment/create",
                method: "POST",
                body
            }),
            invalidatesTags: ['comments']
        })


    })
});



export const { useCreateBlogMutation, useGetAllBlogsMutation, useLatestBlogQuery, useFindByIdQuery, useCreateCommentMutation } = blogApi;
export default blogApi;

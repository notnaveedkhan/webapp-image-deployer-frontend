import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';
import { BasicResponse } from '../interfaces/BasicResponseType';


export interface TrendingTopicsResultType {
    topic: {
        id: number,
        name: string,
        createdAt: string,
        modifiedAt: string
    },
    count: number
}

export interface FollowingResultType {
    id: number,
    name: string,
    createdAt: string,
    modifiedAt: string
}

const topicApi = createApi({
    reducerPath: "topicApi",
    baseQuery: baseQuery,
    tagTypes: ['topics', 'Trending'],
    endpoints: (builder) => ({
        allTopics: builder.query({
            query: () => ({
                url: "/api/v1/auth/private/topics/details",
                method: "GET"
            }),
            providesTags: ['topics'],
        }),

        createTopic: builder.mutation({
            query: (body) => ({
                url: "/api/v1/auth/private/topic/create",
                body,
                method: "POST"
            }),
            invalidatesTags: ['topics']
        }),

        trendingTopics: builder.query<TrendingTopicsResultType[], void>({
            query: () => "/api/v1/auth/private/topics/trends",
            providesTags: ['Trending', 'topics']
        }),

        followTopic: builder.mutation<BasicResponse, number>({
            query: (id: number) => ({
                url: `/api/v1/auth/private/topic/follow?topic=${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['Trending']
        }),

        followingTopics: builder.query<FollowingResultType[], void>({
            query: () => "/api/v1/auth/private/topics/following",
            providesTags: ['Trending']
        }),

        unFollowTopic: builder.mutation<BasicResponse, number>({
            query: (id: number) => ({
                url: `/api/v1/auth/private/topic/unfollow?topic=${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['topics', 'Trending']
        }),
    })
});

export const {
    useCreateTopicMutation,
    useAllTopicsQuery,
    useTrendingTopicsQuery,
    useFollowTopicMutation,
    useFollowingTopicsQuery,
    useUnFollowTopicMutation
} = topicApi;
export default topicApi;
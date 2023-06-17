import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasicResponse } from '../interfaces/BasicResponseType';


export interface TrandingTopicsResultType {
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
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.REACT_APP_BASEURL,
        baseUrl: process.env.REACT_APP_BASEURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { login: { token: string } }).login.token;
            if (token) {
                headers.set("Authorization", token);
            }

            return headers;
        }
    }),
    tagTypes: ['topics', 'Tranding'],
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

        trandingTopics: builder.query<TrandingTopicsResultType[], void>({
            query: () => "/api/v1/auth/private/topics/trends",
            providesTags: ['Tranding', 'topics']
        }),

        followTopic: builder.mutation<BasicResponse, number>({
            query: (id: number) => ({
                url: `/api/v1/auth/private/topic/follow?topic=${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['Tranding']
        }),

        followingTopics: builder.query<FollowingResultType[], void>({
            query: () => "/api/v1/auth/private/topics/following",
            providesTags: ['Tranding']
        })

    })
});

export const { useCreateTopicMutation, useAllTopicsQuery, useTrandingTopicsQuery, useFollowTopicMutation, useFollowingTopicsQuery } = topicApi;
export default topicApi;
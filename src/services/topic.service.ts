import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



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
    tagTypes: ['topics'],
    endpoints: (buildre) => ({
        allTopics: buildre.query({
            query: () => ({
                url: "/api/v1/auth/private/topics/details",
                method: "GET"
            }),
            providesTags: ['topics'],
        }),
        createTopic: buildre.mutation({
            query: (body) => ({
                url: "/api/v1/auth/private/topic/create",
                body,
                method: "POST"
            }),
            invalidatesTags: ['topics']
        })

    })
});

export const { useCreateTopicMutation, useAllTopicsQuery } = topicApi;
export default topicApi;
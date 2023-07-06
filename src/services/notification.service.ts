import { BasicResponse } from './../interfaces/BasicResponseType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Notification {
    id: number,
    title: string,
    description: string,
    type: string,
    createdAt: string
}

const notificationApi = createApi({
    reducerPath: "notificationApi",
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
    tagTypes: ['Notification'],
    endpoints: (builder) => ({

        getAllNotifications: builder.query<Notification[], void>({
            query: () => `/api/v1/auth/private/notification/details`,
            providesTags: ['Notification']
        }),

        seenNotification: builder.mutation<BasicResponse, string>({
            query: (nid: string) => ({
                url: `/api/v1/auth/private/notification/${nid}/seen`,
                method: 'PUT'

            }),
            invalidatesTags: ['Notification']
        }),

        seenAllNotification: builder.mutation<BasicResponse, void>({
            query: () => ({
                url: `/api/v1/auth/private/notification/seen`,
                method: 'PUT'
            }),
            invalidatesTags: ['Notification']
        })

    })
});


export default notificationApi;
export const { useGetAllNotificationsQuery, useSeenNotificationMutation, useSeenAllNotificationMutation } = notificationApi;

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Helper/baseQuery';

export interface Roles {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    modifiedAt: string
}

export interface UserResponse {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
    verified: boolean,
    roles: Roles[]
}

export interface UserBody {
    name: string,
    email: string,
    address: string,
    phone: string,
    password: null
}

const userApi = createApi({
    reducerPath: "UserApi",
    baseQuery: baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
            query: () => "/api/v1/auth/private/user/detail",
            providesTags: ["User"]
        }),

        updateUser: builder.mutation<UserResponse, UserBody>({
            query: (data) => ({
                url: "/api/v1/auth/private/user/update",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"]
        })
    })
});


export const { useLazyGetUserQuery, useGetUserQuery, useUpdateUserMutation } = userApi;

export default userApi;
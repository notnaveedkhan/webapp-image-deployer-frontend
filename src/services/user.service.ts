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

const userApi = createApi({
    reducerPath: "UserApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
            query: () => "/api/v1/auth/private/user/detail"
        })
    })
});


export const { useLazyGetUserQuery, useGetUserQuery } = userApi;

export default userApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface ICluster {
    name: string;
    region: string;
}

const controlPlaneApi = createApi({
    reducerPath: 'clusterApi',
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
    tagTypes: ['Cluster'],
    endpoints: (builder) => ({
        createControlPlane: builder.mutation({
            query: (data: ICluster) => ({
                url: "/api/v1/auth/private/control-plane/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Cluster']
        }),
        getAllControlPlane: builder.query({
            query: () => '/api/v1/auth/private/control-planes/details',
            providesTags: ['Cluster']
        })
    })
})


export default controlPlaneApi;
export const { useCreateControlPlaneMutation, useGetAllControlPlaneQuery } = controlPlaneApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface KbueServiceBody {
    name: string,
    targetPort: number,
    controlPlane: number
}


const kbueServiceApi = createApi({
    reducerPath: "kbueServiceApi",
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
    tagTypes: ['KbueService'],
    endpoints: (builder) => ({

        createKbueService: builder.mutation<any, KbueServiceBody>({
            query: (body: KbueServiceBody) => ({
                url: "/api/v1/kube/kube-service/create",
                method: "POST",
                body
            }),
            invalidatesTags: ['KbueService']
        }),
        allKbueService: builder.query<any, void>({
            query: () => "/api/v1/kube/kube-service/details",
            providesTags: ['KbueService']
        })

    })
});



export default kbueServiceApi;
export const { useCreateKbueServiceMutation, useAllKbueServiceQuery } = kbueServiceApi;
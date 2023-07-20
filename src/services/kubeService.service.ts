import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';

interface KubeServiceBody {
    name: string,
    targetPort: number,
    controlPlane: number
}


const kubeServiceApi = createApi({
    reducerPath: "kubeServiceApi",
    baseQuery: baseQuery,
    tagTypes: ['KubeService'],
    endpoints: (builder) => ({
        createKubeService: builder.mutation<any, KubeServiceBody>({
            query: (body: KubeServiceBody) => ({
                url: "/api/v1/kube/kube-service/create",
                method: "POST",
                body
            }),
            invalidatesTags: ['KubeService']
        }),
        allKubeService: builder.query<any, void>({
            query: () => "/api/v1/kube/kube-service/details",
            providesTags: ['KubeService']
        }),
        deleteKubeService: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/api/v1/kube/kube-service/${id}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ["KubeService"]
        })
    })
});


export default kubeServiceApi;
export const {
    useCreateKubeServiceMutation,
    useAllKubeServiceQuery,
    useDeleteKubeServiceMutation,
} = kubeServiceApi;
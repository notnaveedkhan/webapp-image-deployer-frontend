import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface KubeServiceBody {
    name: string,
    targetPort: number,
    controlPlane: number
}


const kubeServiceApi = createApi({
    reducerPath: "kubeServiceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASEURL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as { login: { token: string } }).login.token;
            if (token) {
                headers.set("Authorization", token);
            }

            return headers;
        }
    }),
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
        })

    })
});


export default kubeServiceApi;
export const {useCreateKubeServiceMutation, useAllKubeServiceQuery} = kubeServiceApi;
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';

interface Containers {
    name: string,
    image: string,
    containerPort: number,
    env?: {}
}


interface DeploymentBody {
    name: string,
    containers: Containers[],
    replicas: number,
    controlPlane: number,
    targetPort: number
}


const deploymentApi = createApi({
    reducerPath: "deploymentApi",
    baseQuery: baseQuery,
    tagTypes: ['Deployment'],
    endpoints: (builder) => ({
        createDeployment: builder.mutation<any, DeploymentBody>({
            query: (body: DeploymentBody) => ({
                url: "/api/v1/kube/web/app/deployment/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["Deployment"]
        }),
        getAllDeployments: builder.query<any, void>({
            query: () => "/api/v1/kube/web/app/deployment/details",
            providesTags: ["Deployment"]
        }),
        deleteDeployment: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/api/v1/kube/web/app/deployment/${id}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ["Deployment"]
        })
    })
});

export default deploymentApi;
export const {
    useCreateDeploymentMutation,
    useGetAllDeploymentsQuery,
    useDeleteDeploymentMutation
} = deploymentApi;
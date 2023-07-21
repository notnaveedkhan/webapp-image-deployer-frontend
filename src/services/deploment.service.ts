import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery';

interface Containers {
    name: string,
    image: string,
    containerPort: number,
    env?: {}
}


export interface DeploymentBody {
    name: string,
    containers: Containers[],
    replicas: number,
    controlPlane: number,
    targetPort: number
}

export interface Container {
    name: string,
    image: string,
    containerPort: number,
    env?: {}
}


export interface DeploymentResponse {
    id: number
    name: string,
    url: string,
    cluster: string,
    replicas: number,
    status: 'CREATED' | 'CREATING',
    createdAt: string,
    modifiedAt: string,
    containers: Container[]
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
        getAllDeployments: builder.query<DeploymentResponse[], void>({
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
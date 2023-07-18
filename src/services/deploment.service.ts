import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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
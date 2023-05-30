import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NodeGroup {
    controlPlane: number,
    nodeGroupName: string,
    region: number,
    nodeInstanceType: string,
    nodeGroupMaxSize: number,
    nodeGroupMinSize: number,
    nodeGroupDesiredSize: number,
    nodeVolumeSize: number,
    nodeImageId: string
}


const nodeGroupApi = createApi({
    reducerPath: 'nodeGroupService',
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
    tagTypes: ['NodeGroup'],
    endpoints: (builder) => ({
        getNodeGroups: builder.query<NodeGroup[], void>({
            query: () => '/api/v1/auth/private/node-groups/details',
            providesTags: ['NodeGroup']
        }),
        addNodeGroup: builder.mutation<NodeGroup, NodeGroup>({
            query: (nodeGroup: NodeGroup) => ({
                url: '/api/v1/auth/private/node-group/create',
                method: 'POST',
                body: nodeGroup
            }),
            invalidatesTags: ['NodeGroup']
        }),
    })
})



export const { useGetNodeGroupsQuery, useAddNodeGroupMutation } = nodeGroupApi;
export default nodeGroupApi;
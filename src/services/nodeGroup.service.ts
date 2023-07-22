import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Helper/baseQuery';

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
    baseQuery: baseQuery,
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
        deleteNodeGroup: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/api/v1/auth/private/node-group/${id}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ["NodeGroup"]
        })
    })
})



export const {
    useGetNodeGroupsQuery,
    useLazyGetNodeGroupsQuery,
    useAddNodeGroupMutation,
    useDeleteNodeGroupMutation
} = nodeGroupApi;
export default nodeGroupApi;
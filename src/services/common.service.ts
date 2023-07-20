import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Helper/baseQuery';


export interface BuildDetails {
    applicationName: string,
    buildNumber: string,
    buildTimestamp: string
}


const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: baseQuery,
    tagTypes: ['comments'],
    endpoints: (builder) => ({
        getAuthenticationServiceBuildDetails: builder.query<BuildDetails, void>({
            query: () => '/api/v1/auth/public/common/build-detail'
        }),

        getAwsServiceBuildDetails: builder.query<BuildDetails, void>({
            query: () => '/api/v1/aws/public/common/build-detail'
        }),

        getKubernetesServiceBuildDetails: builder.query<BuildDetails, void>({
            query: () => '/api/v1/kube/public/common/build-detail'
        })
    }),

});


export default commonApi;

export const {
    useGetAuthenticationServiceBuildDetailsQuery,
    useGetAwsServiceBuildDetailsQuery,
    useGetKubernetesServiceBuildDetailsQuery
} = commonApi
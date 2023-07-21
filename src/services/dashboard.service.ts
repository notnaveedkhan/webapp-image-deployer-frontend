import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Helper/baseQuery';

export interface CostaAndUsage {
    cost: number;
    count: number;
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery,
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getCostOfAuthentication: builder.query<CostaAndUsage, void>({
            query: () => '/api/v1/auth/private/cost/details',
        }),
        getCostOfDeployments: builder.query<CostaAndUsage, void>({
            query: () => '/api/v1/kube/web/app/cost/details',
        })
    }),
});



export const { useGetCostOfAuthenticationQuery, useGetCostOfDeploymentsQuery } = dashboardApi;
export default dashboardApi;
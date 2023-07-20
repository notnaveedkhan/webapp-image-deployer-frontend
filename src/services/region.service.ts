import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../Helper/baseQuery";


const regionApi = createApi({
    reducerPath: "regionApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllRegions: builder.query({
            query: () => `/api/v1/auth/private/regions/details`
        }),
    }
    )
})

export default regionApi;
export const { useGetAllRegionsQuery } = regionApi;
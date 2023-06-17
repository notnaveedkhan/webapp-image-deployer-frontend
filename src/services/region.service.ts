import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const regionApi = createApi({
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
    endpoints: (builder) => ({
            getAllRegions: builder.query({
                query: () => `/api/v1/auth/private/regions/details`
            }),
        }
    )
})

export default regionApi;
export const {useGetAllRegionsQuery} = regionApi;
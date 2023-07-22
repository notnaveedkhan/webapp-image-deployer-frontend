import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../Helper/baseQuery";
import { BasicResponse } from "../interfaces/BasicResponseType";
import { UserResponse } from "./user.service";


export interface ReportResponse {
    id: number;
    title: string;
    content: string;
    status: string;
    response: string;
    viewedBy: string;
    createdAt: string;
    modifiedAt: string;
}

export interface ReportBody {
    title: string;
    content: string;
}

export interface UpdateReportBody {
    report: number;
    status: 'PENDING' | 'CLOSED';
    response: string;
}

export interface ReportResponseAdmin {
    id: 0,
    title: string,
    content: string,
    status: 'PENDING' | 'CLOSED',
    response: string,
    viewedBy: string,
    createdAt: string,
    modifiedAt: string,
    createdBy: UserResponse
}



const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery,
    tagTypes: ["report"],
    endpoints: (builder) => ({
        getAllReportByUser: builder.query<ReportResponse[], void>({
            query: () => "/api/v1/auth/private/user/reports/details",
            providesTags: ["report"],

        }),
        createReports: builder.mutation<BasicResponse, ReportBody>({
            query: (body: ReportBody) => ({
                url: "/api/v1/auth/private/report/create",
                body,
                method: "POST"
            }),
            invalidatesTags: ["report"]
        }),
        updateReport: builder.mutation<BasicResponse, UpdateReportBody>({
            query: (body) => ({
                url: `/api/v1/auth/private/report/update`,
                body,
                method: "PUT"
            }),
            invalidatesTags: ["report"]
        }),
        getAllReportsDetailsAdmin: builder.query<ReportResponseAdmin[], void>({
            query: () => "/api/v1/auth/private/reports/details",
            providesTags: ["report"]
        }),
        deleteReport: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/api/v1/auth/private/report/${id}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ["report"]
        })
    })

});



export const {
    useGetAllReportByUserQuery,
    useCreateReportsMutation,
    useUpdateReportMutation,
    useGetAllReportsDetailsAdminQuery,
    useDeleteReportMutation
} = reportApi;

export default reportApi;
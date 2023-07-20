import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../Helper/baseQuery'
import { BasicResponse } from '../interfaces/BasicResponseType'


interface OTP {
    email: string,
    code: string
}


export const otpApi = createApi({
    reducerPath: 'otpApi',
    baseQuery,
    tagTypes: ['Otp'],
    endpoints: (builder) => ({
        verifyOtp: builder.mutation<BasicResponse, OTP>({
            query: (body: OTP) => ({
                url: '/api/v1/auth/public/otp/email-verify-otp/verify',
                body,
                method: 'POST'
            })
        })
    })
});


export const { useVerifyOtpMutation } = otpApi

export default otpApi;
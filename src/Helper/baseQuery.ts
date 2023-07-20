import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';


export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).login.token;
        if (token) {
            headers.set('authorization', token);
        }
        return headers;
    }
})
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../Helper/baseQuery';
import { BasicResponse } from '../interfaces/BasicResponseType';

export interface CardBody {
    number: string;
    cvc: string;
    expiryDate: string;
    cardholderName: string;
}

export interface CardDetails {
    id: number;
    number: string;
    cvc: string;
    expiryDate: string;
    cardholderName: string;
}


const cardApi = createApi({
    reducerPath: 'cardApi',
    baseQuery: baseQuery,
    tagTypes: ['cards'],
    endpoints: (builder) => ({
        createCard: builder.mutation<BasicResponse, CardBody>({
            query: (body: CardBody) => ({
                url: '/api/v1/auth/private/card/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['cards']
        }),

        getCards: builder.query<CardDetails[], void>({
            query: () => '/api/v1/auth/private/cards/details',
            providesTags: ['cards']
        }),

        deleteCard: builder.mutation<BasicResponse, string>({
            query: (id: string) => ({
                url: `/api/v1/auth/private/card/${id}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cards']
        })
    })

});


export default cardApi;

export const { useCreateCardMutation, useGetCardsQuery, useDeleteCardMutation, useLazyGetCardsQuery } = cardApi
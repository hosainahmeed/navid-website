import { Shorting } from "@/app/(default)/browse-Predictions/page";
import baseApis from "../query/baseApis";

const postApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        allPost: builder.query({
            query: ({ targetUser, searchTerm, shorting }: { targetUser: string, searchTerm: string, shorting: Shorting }) => ({
                url: '/post/get-all-posts',
                method: 'GET',
                params: {
                    targetUser: targetUser,
                    searchTerm: searchTerm || shorting.predictionType,
                    sort: shorting.sortBy,
                }
            }),
            providesTags: ['post'],
        }),
        allUniqueTypes: builder.query({
            query: () => ({
                url: '/post/get-all-unique-types',
                method: 'GET',
            }),
            providesTags: ['uniqueTypes'],
        })
    }),
})

export const { useAllPostQuery, useAllUniqueTypesQuery } = postApis
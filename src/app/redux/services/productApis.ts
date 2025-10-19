import baseApis from "../query/baseApis";

const productApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: (params?: any) => ({
                url: '/product/get-all',
                method: 'GET',
                params,
            }),
            providesTags: ['product'],
        }),
        getSingleProduct: builder.query({
            query: (id: string) => ({
                url: `/product/get-details/${id}`,
                method: 'GET',
            }),
            providesTags: ['product'],
        }),
    })
})

export const { useGetAllProductQuery, useGetSingleProductQuery } = productApis
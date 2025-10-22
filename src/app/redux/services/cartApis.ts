import baseApis from "../query/baseApis";

const cartApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllCart: builder.query({
            query: () => ({
                url: '/cart/get-all',
                method: 'GET'
            }),
            providesTags: ['cart']
        }),
        createCart: builder.mutation({
            query: (data: any) => ({
                url: '/cart/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cart']
        }),
        deleteCart: builder.mutation({
            query: (id: string) => ({
                url: `/cart/delete-item/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cart']
        })
    })
})

export const { useGetAllCartQuery, useCreateCartMutation, useDeleteCartMutation } = cartApis

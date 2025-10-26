import baseApis from "../query/baseApis";

const orderApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data: {
                items: Array<{
                    product: string;
                    quantity: number;
                    color: string;
                    size: string;
                }>;
                total_amount: number;
                delivery_address?: string;
                pick_up_address?: string;
                notes?: string;
            }) => ({
                url: '/order/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cart', 'order']
        }),
        getAllOrders: builder.query({
            query: (page: number = 1) => ({
                url: `/order/get-all?page=${page}`,
                method: 'GET'
            }),
            providesTags: ['order']
        })
    })
})

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApis

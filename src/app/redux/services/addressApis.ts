import baseApis from "../query/baseApis";

const addressApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllShippingAddress: builder.query({
            query: () => ({
                url: '/shipping-address/get-all',
                method: 'GET'
            }),
            providesTags: ['shippingAddress']
        }),
        createShippingAddress: builder.mutation({
            query: (data: { address: string; phone: string; name: string }) => ({
                url: '/shipping-address/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['shippingAddress']
        }),
        getAllPickupAddress: builder.query({
            query: () => ({
                url: '/pick-address/get-all',
                method: 'GET'
            }),
            providesTags: ['pickupAddress']
        })
    })
})

export const { 
    useGetAllShippingAddressQuery, 
    useCreateShippingAddressMutation,
    useGetAllPickupAddressQuery 
} = addressApis

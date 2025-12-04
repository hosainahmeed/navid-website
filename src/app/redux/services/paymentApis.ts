import baseApis from "../query/baseApis";

const paymentApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => ({
                url: '/payment/create',
                method: 'POST',
                body: data
            }),
        }),
    })
})

export const { useCreatePaymentMutation } = paymentApis

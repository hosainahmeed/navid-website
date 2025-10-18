import baseApis from "../query/baseApis";


export const subscriptionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: '/subscription-plan/get-all-subscriptionPlans',
        method: 'GET',
      }),
      providesTags: ['subscription'],
    }),
    paymentLinkGenerator: builder.mutation({
      query: (planId: string) => ({
        url: '/payment/post-checkout',
        method: 'POST',
        body: { subscriptionId: planId },
      }),
      invalidatesTags: ['subscription'],
    }),
  }),
});

export const { useGetAllSubscriptionQuery, usePaymentLinkGeneratorMutation } =
  subscriptionApis;
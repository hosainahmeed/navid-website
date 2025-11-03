import baseApis from "../query/baseApis";

export const privacyPolicyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/setting/privacy-policy',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/setting/terms',
        method: 'GET',
      }),
      providesTags: ['termsAndConditions'],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useGetTermsAndConditionsQuery } =
  privacyPolicyApis;

import baseApis from "../query/baseApis";

export const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    allFaq: builder.query({
      query: () => ({
        url: '/manage/get-faq',
        method: 'GET',
      }),
      providesTags: ['faq'],
    }),
  }),
});

export const {
  useAllFaqQuery,
} = faqApis;

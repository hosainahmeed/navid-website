import baseApis from "../query/baseApis";

const bannerApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllBanner: builder.query({
            query: () => ({
                url: '/banner/get-all',
                method: 'GET',
            }),
            providesTags: ['banner'],
        }),        
    })
})

export const { useGetAllBannerQuery } = bannerApis

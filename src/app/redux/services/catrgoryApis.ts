import baseApis from "../query/baseApis";

const catrgoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: '/category/get-all',
                method: 'GET',
            }),
            providesTags: ['category'],
        }),
    })
})

export const { useGetAllCategoryQuery } = catrgoryApis
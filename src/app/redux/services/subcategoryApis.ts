import baseApis from "../query/baseApis";

const subcategoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubCategory: builder.query({
            query: ({category_id}: {category_id: any}) => ({
                url: `/service/get-all?category=${category_id}`,
                method: 'GET',
            }),
            providesTags: ['subcategory'],
        }),
    })
})

export const { useGetAllSubCategoryQuery } = subcategoryApis
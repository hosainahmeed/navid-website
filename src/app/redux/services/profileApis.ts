import baseApis from "../query/baseApis";

const profileApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => ({
                url: '/auth/profile',
                method: 'GET',
            }),
            providesTags: ['profile'],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/auth/update-profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),
    })
})

export const { useProfileQuery, useUpdateProfileMutation } = profileApis
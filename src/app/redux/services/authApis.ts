import baseApis from "../query/baseApis";

const authApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['auth'],
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        verifyForgotOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/forget-pass-otp-verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/verification/verify',
                method: 'POST',
                body: data,
            }),
        }),
        verificationCreate: builder.mutation({
            query: (data) => ({
                url: '/verification/create',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const {
    useSignUpMutation,
    useForgotPasswordMutation,
    useVerifyForgotOtpMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
    useVerificationCreateMutation
} = authApis


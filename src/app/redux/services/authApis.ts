import baseApis from "../query/baseApis";
import Cookies from "js-cookie";
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
            invalidatesTags: ['profile'],
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),
        verifyForgotOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/forget-pass-otp-verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('resetToken')}`
                }
            }),
            invalidatesTags: ['profile'],
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
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),
    })
})

export const {
    useSignUpMutation,
    useForgotPasswordMutation,
    useVerifyForgotOtpMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
    useVerificationCreateMutation,
    useSignInMutation,
    useChangePasswordMutation
} = authApis


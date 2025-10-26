import { url } from '@/app/utils/imagePreview';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['auth', 'profile', 'banner', 'product', 'category', 'subcategory', 'cart', 'shippingAddress', 'pickupAddress'],
    endpoints: () => ({}),
});

export default baseApis;

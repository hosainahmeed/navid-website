import baseApis from "../query/baseApis";

const cartApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllCart: builder.query({
            query: () => ({
                url: '/cart/get-all',
                method: 'GET'
            }),
            providesTags: ['cart']
        }),
        createCart: builder.mutation({
            query: (data: any) => ({
                url: '/cart/create',
                method: 'POST',
                body: data
            }),           
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    (baseApis.util.updateQueryData as any)('getAllCart', undefined, (draft: any) => {
                        if (!draft?.data) return;
                        const payload = arg?.items?.[0];
                        if (!payload) return;
                        const target = draft.data.items?.find((i: any) => i?.product_id?._id === payload.product_id);
                        if (!target) return;                       
                        target.quantity = payload.quantity;
                        const unitPrice = target?.product_id?.price ?? target?.price ?? 0;
                        target.price = (target?.product_id?.price ?? unitPrice) * payload.quantity;                       
                        draft.data.total_price = draft.data.items?.reduce((sum: number, it: any) => sum + (it?.price || 0), 0);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ['cart']
        }),
        deleteCart: builder.mutation({
            query: (id: string) => ({
                url: `/cart/delete-item/${id}`,
                method: 'DELETE'
            }),           
            async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    (baseApis.util.updateQueryData as any)('getAllCart', undefined, (draft: any) => {
                        if (!draft?.data) return;
                        draft.data.items = draft.data.items?.filter((i: any) => i?.product_id?._id !== id);
                        draft.data.total_price = draft.data.items?.reduce((sum: number, it: any) => sum + (it?.price || 0), 0);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ['cart']
        })
    })
})

export const { useGetAllCartQuery, useCreateCartMutation, useDeleteCartMutation } = cartApis

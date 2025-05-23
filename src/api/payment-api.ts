import { appBaseApi, TAG_TYPES } from '@/api/instances';

export interface CartItemDto {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface MakePaymentResponse {
  id: string;
  userId: string;
  couponCode?: string;
  cartItems: CartItemDto[];
  discount: number;
  cartTotal: number;
  stripePaymentIntentId: string;
  clientSecret: string;
}

export const paymentApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    makePayment: build.mutation<MakePaymentResponse, void>({
      query: () => ({
        url: 'payment',
        method: 'POST',
      }),
      transformResponse(apiResponse: MakePaymentResponse) {
        return {
          ...apiResponse,
        };
      },
      invalidatesTags: [TAG_TYPES.Payment],
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApi;

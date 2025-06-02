import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { ApiResponse } from '@/interfaces';

export interface CartItemDto {
  id: string;
  commodityId: string;
  commodityName: string;
  price: number;
  quantity: number;
  commodityImage?: string;
  commodityCategory?: number;
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
export type MakePaymentApiResponse = ApiResponse<MakePaymentResponse>;

export const paymentApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    makePayment: build.mutation<MakePaymentApiResponse, void>({
      query: () => ({
        url: 'payment',
        method: 'POST',
      }),
      transformResponse(apiResponse: MakePaymentApiResponse) {
        return {
          ...apiResponse,
          result: apiResponse.result,
        };
      },
      invalidatesTags: [TAG_TYPES.Payment],
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApi;

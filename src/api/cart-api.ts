import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type {
  AddUpdateCartItemRequest,
  ApplyCouponRequest,
} from '@/models/request/cart/cart-request';
import type { GetCartResponse } from '@/models/response/cart/cart-response';

export const cartApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartResponse, void>({
      query: () => 'shopping-cart',
      providesTags: [TAG_TYPES.Cart],
    }),
    addUpdateCartItem: build.mutation<void, AddUpdateCartItemRequest>({
      query: (props) => ({
        url: 'shopping-cart/add-update-item',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    applyCoupon: build.mutation<void, ApplyCouponRequest>({
      query: (props) => ({
        url: 'shopping-cart/apply-coupon',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddUpdateCartItemMutation,
  useApplyCouponMutation,
} = cartApi;

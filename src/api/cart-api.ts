import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type {
  AddCartItemRequest,
  MergeCartRequest,
  RemoveCartItemRequest,
  UpdateQuantityRequest,
} from '@/models/request/cart/cart-request';
import type { GetCartResponse } from '@/models/response/cart/cart-response';

export const cartApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartResponse, void>({
      query: () => 'shopping-cart',
      providesTags: [TAG_TYPES.Cart],
    }),
    addCartItem: build.mutation<void, AddCartItemRequest>({
      query: (props) => ({
        url: 'shopping-cart',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    removeCartItem: build.mutation<void, RemoveCartItemRequest>({
      query: (props) => ({
        url: 'shopping-cart',
        method: 'DELETE',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    updateQuantity: build.mutation<void, UpdateQuantityRequest>({
      query: (props) => ({
        url: 'shopping-cart',
        method: 'PUT',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    validateCart: build.mutation<void, void>({
      query: () => ({
        url: 'shopping-cart/validate',
        method: 'PUT',
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    mergeCart: build.mutation<void, MergeCartRequest>({
      query: (props) => ({
        url: 'shopping-cart/merge',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
    clearCart: build.mutation<void, void>({
      query: () => ({
        url: 'shopping-cart/clear',
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPES.Cart],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useUpdateQuantityMutation,
  useValidateCartMutation,
  useMergeCartMutation,
  useClearCartMutation,
} = cartApi;

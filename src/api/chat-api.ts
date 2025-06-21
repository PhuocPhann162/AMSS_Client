import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { GetRoomMessagesRequest } from '@/models/request/chat/get-chat-room-request';
import {
  GetChatRoomsResponse,
  GetRoomMessagesResponse,
  SearchUsersResponse,
} from '@/models/response/chat/get-chat-rooms-response';
import { CreateRoomRequest } from '@/models/request/chat/create-room-request';
import { ChatRoom } from '@/interfaces/chat/chat-system';
import { PaginationRequest } from '@/models';

export const chatMessageApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getChatRooms: build.query<GetChatRoomsResponse, void>({
      query: () => ({
        url: 'chats/get-rooms',
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Chats],
    }),
    getRoomMessages: build.query<
      GetRoomMessagesResponse,
      { roomId: string; request: GetRoomMessagesRequest }
    >({
      query: ({ roomId, request }) => ({
        url: `chats/${roomId}/get-room-messages`,
        method: 'GET',
        params: request,
      }),
      providesTags: [TAG_TYPES.Chats],
    }),
    createRoom: build.mutation<ChatRoom, CreateRoomRequest>({
      query: (body) => ({
        url: 'chats/create-room',
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG_TYPES.Chats],
    }),
    searchUsers: build.query<SearchUsersResponse, PaginationRequest>({
      query: (request) => ({
        url: 'chats/search-users',
        method: 'GET',
        params: request,
      }),
      providesTags: [TAG_TYPES.Chats],
    }),
  }),
});

export const {
  useGetChatRoomsQuery,
  useGetRoomMessagesQuery,
  useCreateRoomMutation,
  useSearchUsersQuery,
} = chatMessageApi;

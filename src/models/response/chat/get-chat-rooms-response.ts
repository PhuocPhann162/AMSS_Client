import { User, type ApiResponse } from '@/interfaces';
import { ChatRoom, MessageDto } from '@/interfaces/chat/chat-system';
import { PaginationResponse } from '../paginationResponse';

export type GetChatRoomsResponse = ApiResponse<ChatRoom[]>;

export type GetRoomMessagesResponse = ApiResponse<
  PaginationResponse<MessageDto>
>;

export type SearchUsersResponse = ApiResponse<PaginationResponse<User>>;

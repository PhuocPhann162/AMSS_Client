import { ChatRoomType } from '@/interfaces/chat/chat-system';

export interface CreateRoomRequest {
  name: string;
  description: string;
  type: ChatRoomType;
  memberIds: string[];
}

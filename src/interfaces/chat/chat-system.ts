import { HubConnection } from '@microsoft/signalr';

// types/chat.ts
export interface MessageDto {
  id: string;
  content: string;
  type: string;
  senderId: string;
  senderName: string;
  chatRoomId: string;
  sentAt: string;
  isEdited: boolean;
}

export interface CreateMessageDto {
  content: string;
  chatRoomId: string;
  type: MessageType;
}

export enum MessageType {
  Text = 0,
  Image = 1,
  File = 2,
  Video = 3,
  Audio = 4,
}

export enum ChatRoomType {
  Private = 0,
  Group = 1,
  Channel = 2,
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: ChatRoomType;
  createdById: string;
  createdAt: string;
  isActive: boolean;
}

export interface ChatState {
  currentRoom: string | null;
  rooms: ChatRoom[];
  messages: Record<string, MessageDto[]>;
  onlineUsers: string[];
  typingUsers: Record<string, string[]>;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface SignalRService {
  connection: HubConnection | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  sendMessage: (messageDto: CreateMessageDto) => Promise<void>;
  sendPrivateMessage: (recipientId: string, content: string) => Promise<void>;
  sendTyping: (roomId: string, isTyping: boolean) => Promise<void>;
}

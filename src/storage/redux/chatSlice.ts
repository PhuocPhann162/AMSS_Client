// store/chatSlice.ts
import { ChatRoom, ChatState, MessageDto } from '@/interfaces/chat/chat-system';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChatState = {
  currentRoom: null,
  rooms: [],
  messages: {},
  onlineUsers: [],
  typingUsers: {},
  isConnected: false,
  isConnecting: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConnectionStatus: (
      state,
      action: PayloadAction<{ isConnected: boolean; isConnecting: boolean }>,
    ) => {
      state.isConnected = action.payload.isConnected;
      state.isConnecting = action.payload.isConnecting;
      if (action.payload.isConnected) {
        state.error = null;
      }
    },

    setCurrentRoom: (state, action: PayloadAction<string | null>) => {
      state.currentRoom = action.payload;
    },

    addRoom: (state, action: PayloadAction<ChatRoom>) => {
      const existingRoom = state.rooms.find(
        (room) => room.id === action.payload.id,
      );
      if (!existingRoom) {
        state.rooms.push(action.payload);
      }
    },

    setRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.rooms = action.payload;
    },

    addMessage: (state, action: PayloadAction<MessageDto>) => {
      const roomId = action.payload.chatRoomId;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }

      // Tránh duplicate messages
      const existingMessage = state.messages[roomId].find(
        (msg) => msg.id === action.payload.id,
      );
      if (!existingMessage) {
        state.messages[roomId].push(action.payload);
        // Sort messages by sentAt
        state.messages[roomId].sort(
          (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
        );
      }
    },

    setMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: MessageDto[] }>,
    ) => {
      state.messages[action.payload.roomId] = action.payload.messages.sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
      );
    },

    updateMessage: (state, action: PayloadAction<MessageDto>) => {
      const roomId = action.payload.chatRoomId;
      if (state.messages[roomId]) {
        const messageIndex = state.messages[roomId].findIndex(
          (msg) => msg.id === action.payload.id,
        );
        if (messageIndex !== -1) {
          state.messages[roomId][messageIndex] = action.payload;
        }
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ roomId: string; messageId: string }>,
    ) => {
      const { roomId, messageId } = action.payload;
      if (state.messages[roomId]) {
        state.messages[roomId] = state.messages[roomId].filter(
          (msg) => msg.id !== messageId,
        );
      }
    },

    setUserOnline: (state, action: PayloadAction<string>) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },

    setUserOffline: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (userId) => userId !== action.payload,
      );
    },

    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },

    setUserTyping: (
      state,
      action: PayloadAction<{
        userId: string;
        isTyping: boolean;
        roomId?: string;
      }>,
    ) => {
      const { userId, isTyping, roomId } = action.payload;
      const currentRoomId = roomId || state.currentRoom;

      if (currentRoomId) {
        if (!state.typingUsers[currentRoomId]) {
          state.typingUsers[currentRoomId] = [];
        }

        if (isTyping) {
          if (!state.typingUsers[currentRoomId].includes(userId)) {
            state.typingUsers[currentRoomId].push(userId);
          }
        } else {
          state.typingUsers[currentRoomId] = state.typingUsers[
            currentRoomId
          ].filter((id) => id !== userId);
        }
      }
    },

    clearTypingUsers: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;
      if (state.typingUsers[roomId]) {
        state.typingUsers[roomId] = [];
      }
    },

    addError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetChat: () => {
      return initialState;
    },
  },
});

export const {
  setConnectionStatus,
  setCurrentRoom,
  addRoom,
  setRooms,
  addMessage,
  setMessages,
  updateMessage,
  deleteMessage,
  setUserOnline,
  setUserOffline,
  setOnlineUsers,
  setUserTyping,
  clearTypingUsers,
  addError,
  clearError,
  resetChat,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

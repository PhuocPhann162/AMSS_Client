// components/Chat/ChatRoom.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useChat, useTyping } from '../../hooks/useChat';
import { MessageType } from '@/interfaces/chat/chat-system';
import MessageList from './components/message-list';
import TypingIndicator from './components/typing-indicator';
import { MessageInput } from './components/message-input';
import OnlineUsers from './components/online-users';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { User } from '@/interfaces';
import { useGetRoomMessagesQuery, useSearchUsersQuery } from '@/api/chat-api';
import { ListSortDirection } from '@/models';

interface ChatRoomProps {
  roomId: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const chat = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const { data: usersData } = useSearchUsersQuery({
    orderBy: 'IsOnline',
    orderByDirection: 1,
    currentPage: 1,
    limit: 1000,
    search: '',
  });
  const allUsers: User[] = (usersData?.result?.collection || [])
    .filter((u) => typeof u.id === 'string')
    .map((u) => ({ ...u, id: String(u.id) }));
  const onlineUserObjects = allUsers.filter((u) =>
    chat.onlineUsers.includes(u.id ?? ''),
  );

  // Map userId sang fullName
  const userIdToName = Object.fromEntries(
    allUsers.map((u) => [u.id, u.fullName ?? 'Unknown']),
  );

  // Lấy messages từ API thay vì từ chat state
  const { data: messagesData, isLoading: isLoadingMessages } =
    useGetRoomMessagesQuery({
      roomId: roomId,
      request: {
        orderBy: 'CreatedAt',
        orderByDirection: ListSortDirection.Ascending,
        currentPage: 1,
        limit: 1000,
        search: '',
      },
    });

  const apiMessages = messagesData?.result?.collection || [];
  const realTimeMessages = chat.messages[roomId] || [];

  const allMessages = [...apiMessages, ...realTimeMessages];
  const uniqueMessages = allMessages.filter(
    (message, index, self) =>
      index === self.findIndex((m) => m.id === message.id),
  );

  // Map sender names cho messages
  const messagesWithSenderName = uniqueMessages.map((msg) => ({
    ...msg,
    senderName: String(
      msg.senderName || userIdToName[msg.senderId] || 'Unknown',
    ),
  }));

  useEffect(() => {
    chat.joinRoom(roomId);
    return () => {
      chat.leaveRoom(roomId, { setCurrentRoomNull: false });
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesWithSenderName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    await chat.sendMessage(content, MessageType.Text);
  };

  const { handleTyping, stopTyping } = useTyping(
    () => chat.startTyping(),
    () => chat.stopTyping(),
  );

  if (!chat.isConnected) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-500'></div>
          <p className='text-gray-500'>
            {chat.isConnecting
              ? 'Connecting to chat...'
              : 'Disconnected from chat'}
          </p>
          {!chat.isConnecting && (
            <button
              onClick={chat.reconnect}
              className='mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
              Reconnect
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isLoadingMessages) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-500'></div>
          <p className='text-gray-500'>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full'>
      {/* Main chat area */}
      <div className='flex flex-1 flex-col'>
        {/* Messages */}
        <div className='flex-1 space-y-4 overflow-y-auto p-4'>
          <MessageList
            messages={messagesWithSenderName}
            currentUserId={currentUserId ?? ''}
          />
          <TypingIndicator
            typingUsers={chat.typingUsers[roomId] || []}
            currentUserId={currentUserId}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          onStopTyping={stopTyping}
          disabled={!chat.isConnected}
        />
      </div>

      {/* Online users sidebar */}
      <div className='w-72 border-l border-gray-200'>
        <OnlineUsers
          onlineUsers={onlineUserObjects}
          onSendPrivateMessage={chat.sendPrivateMessage}
        />
      </div>
    </div>
  );
};

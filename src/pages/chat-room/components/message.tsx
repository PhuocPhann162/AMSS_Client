// components/Chat/Message.tsx
import { MessageDto } from '@/interfaces/chat/chat-system';
import React from 'react';

interface MessageProps {
  message: MessageDto;
  currentUserId: string;
}

export const Message: React.FC<MessageProps> = ({ message, currentUserId }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isCurrentUser = message.senderId === currentUserId;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
          isCurrentUser
            ? 'to bg-yellow-100 bg-gradient-to-t from-green-100 text-black'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {!isCurrentUser && (
          <div className='mb-1 text-sm font-semibold text-gray-600'>
            {message.senderName}
          </div>
        )}
        <div className='break-words'>{message.content}</div>
        <div
          className={`mt-1 text-xs ${isCurrentUser ? 'text-black' : 'text-gray-500'}`}
        >
          {formatTime(message.sentAt)}
          {message.isEdited && <span className='ml-1'>(edited)</span>}
        </div>
      </div>
    </div>
  );
};

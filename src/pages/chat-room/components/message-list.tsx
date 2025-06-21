// components/Chat/MessageList.tsx
import { MessageDto } from '@/interfaces/chat/chat-system';
import React from 'react';
import { Message } from './message';

interface MessageListProps {
  messages: MessageDto[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  const safeCurrentUserId = currentUserId || '';
  if (messages.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          currentUserId={safeCurrentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;

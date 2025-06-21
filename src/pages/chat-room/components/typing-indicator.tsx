// components/Chat/TypingIndicator.tsx
import React from 'react';

interface TypingIndicatorProps {
  typingUsers: string[];
  currentUserId?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  typingUsers,
  currentUserId,
}) => {
  // Filter out current user from typing users
  const otherTypingUsers = typingUsers.filter(
    (userId) => userId !== currentUserId,
  );

  if (otherTypingUsers.length === 0) {
    return null;
  }

  return (
    <div className='flex items-center space-x-2 text-sm text-gray-500'>
      <div className='flex space-x-1'>
        <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400'></div>
        <div
          className='h-2 w-2 animate-bounce rounded-full bg-gray-400'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className='h-2 w-2 animate-bounce rounded-full bg-gray-400'
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
      <span>
        {otherTypingUsers.length === 1
          ? `Someone is typing...`
          : `${otherTypingUsers.length} people are typing...`}
      </span>
    </div>
  );
};

export default TypingIndicator;
